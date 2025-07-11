
const pool = require('../config/database');

// Get all libraries with pagination
exports.getAllLibraries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || '';

    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND (name ILIKE $${paramCount} OR contact_person ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      queryParams.push(status);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM libraries ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalItems = parseInt(countResult.rows[0].count);

    // Get libraries
    paramCount++;
    const dataQuery = `
      SELECT id, name, address, contact_person, phone, email, status, 
             registration_date, approved_at, created_at, updated_at
      FROM libraries 
      ${whereClause}
      ORDER BY created_at DESC
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
    console.error('Error fetching libraries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching libraries',
      error: error.message
    });
  }
};

// Get library by ID
exports.getLibraryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT id, name, address, contact_person, phone, email, status, 
             registration_date, approved_at, created_at, updated_at
      FROM libraries WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Library not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching library:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching library',
      error: error.message
    });
  }
};

// Create new library
exports.createLibrary = async (req, res) => {
  try {
    const { name, address, contact_person, phone, email } = req.body;
    
    const query = `
      INSERT INTO libraries (name, address, contact_person, phone, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, address, contact_person, phone, email, status, 
                registration_date, created_at
    `;
    
    const result = await pool.query(query, [name, address, contact_person, phone, email]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, new_values, changed_by)
       VALUES ('libraries', $1, 'create', $2, $3)`,
      [result.rows[0].id, JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.status(201).json({
      success: true,
      message: 'Library created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating library:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating library',
      error: error.message
    });
  }
};

// Update library
exports.updateLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact_person, phone, email, status } = req.body;
    
    // Get old values for logging
    const oldResult = await pool.query('SELECT * FROM libraries WHERE id = $1', [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Library not found'
      });
    }

    const query = `
      UPDATE libraries 
      SET name = $1, address = $2, contact_person = $3, phone = $4, email = $5, 
          status = $6, approved_at = CASE WHEN $6 = 'approved' AND status != 'approved' THEN CURRENT_TIMESTAMP ELSE approved_at END
      WHERE id = $7
      RETURNING id, name, address, contact_person, phone, email, status, 
                registration_date, approved_at, updated_at
    `;
    
    const result = await pool.query(query, [name, address, contact_person, phone, email, status, id]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, new_values, changed_by)
       VALUES ('libraries', $1, 'update', $2, $3, $4)`,
      [id, JSON.stringify(oldResult.rows[0]), JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'Library updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating library:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating library',
      error: error.message
    });
  }
};

// Delete library
exports.deleteLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get library data for logging
    const libraryResult = await pool.query('SELECT * FROM libraries WHERE id = $1', [id]);
    if (libraryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Library not found'
      });
    }

    // Check if library has associated users or events
    const checkQuery = `
      SELECT 
        (SELECT COUNT(*) FROM users WHERE library_id = $1) as user_count,
        (SELECT COUNT(*) FROM events WHERE library_id = $1) as event_count
    `;
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows[0].user_count > 0 || checkResult.rows[0].event_count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete library with associated users or events'
      });
    }

    await pool.query('DELETE FROM libraries WHERE id = $1', [id]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, changed_by)
       VALUES ('libraries', $1, 'delete', $2, $3)`,
      [id, JSON.stringify(libraryResult.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'Library deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting library:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting library',
      error: error.message
    });
  }
};
