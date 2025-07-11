
const pool = require('../config/database');

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const libraryId = req.query.library_id || '';

    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND (u.username ILIKE $${paramCount} OR u.full_name ILIKE $${paramCount} OR u.email ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND u.status = $${paramCount}`;
      queryParams.push(status);
    }

    if (libraryId) {
      paramCount++;
      whereClause += ` AND u.library_id = $${paramCount}`;
      queryParams.push(libraryId);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM users u ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalItems = parseInt(countResult.rows[0].count);

    // Get users with library information
    paramCount++;
    const dataQuery = `
      SELECT u.id, u.username, u.email, u.full_name, u.phone, u.status, 
             u.last_login, u.created_at, u.updated_at,
             l.name as library_name
      FROM users u
      LEFT JOIN libraries l ON u.library_id = l.id
      ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
    queryParams.push(limit, offset);

    const result = await pool.query(dataQuery, queryParams);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT u.id, u.username, u.email, u.full_name, u.phone, u.library_id, 
             u.status, u.last_login, u.created_at, u.updated_at,
             l.name as library_name
      FROM users u
      LEFT JOIN libraries l ON u.library_id = l.id
      WHERE u.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, full_name, phone, library_id, status } = req.body;
    
    const query = `
      INSERT INTO users (username, email, full_name, phone, library_id, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username, email, full_name, phone, library_id, status, created_at
    `;
    
    const result = await pool.query(query, [username, email, full_name, phone, library_id, status || 'active']);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, new_values, changed_by)
       VALUES ('users', $1, 'create', $2, $3)`,
      [result.rows[0].id, JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, full_name, phone, library_id, status } = req.body;
    
    // Get old values for logging
    const oldResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const query = `
      UPDATE users 
      SET username = $1, email = $2, full_name = $3, phone = $4, 
          library_id = $5, status = $6
      WHERE id = $7
      RETURNING id, username, email, full_name, phone, library_id, status, updated_at
    `;
    
    const result = await pool.query(query, [username, email, full_name, phone, library_id, status, id]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, new_values, changed_by)
       VALUES ('users', $1, 'update', $2, $3, $4)`,
      [id, JSON.stringify(oldResult.rows[0]), JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user data for logging
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, changed_by)
       VALUES ('users', $1, 'delete', $2, $3)`,
      [id, JSON.stringify(userResult.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};
