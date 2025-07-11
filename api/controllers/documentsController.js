
const pool = require('../config/database');

// Get all documents with pagination
exports.getAllDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const category = req.query.category || '';

    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND (d.title ILIKE $${paramCount} OR d.description ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND d.status = $${paramCount}`;
      queryParams.push(status);
    }

    if (category) {
      paramCount++;
      whereClause += ` AND d.category = $${paramCount}`;
      queryParams.push(category);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM documents d ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalItems = parseInt(countResult.rows[0].count);

    // Get documents with user and library information
    paramCount++;
    const dataQuery = `
      SELECT d.id, d.title, d.description, d.file_name, d.file_size, d.file_type, 
             d.category, d.status, d.download_count, d.created_at, d.updated_at,
             u.full_name as uploaded_by_name,
             l.name as library_name
      FROM documents d
      LEFT JOIN users u ON d.uploaded_by = u.id
      LEFT JOIN libraries l ON d.library_id = l.id
      ${whereClause}
      ORDER BY d.created_at DESC
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
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching documents',
      error: error.message
    });
  }
};

// Get document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT d.id, d.title, d.description, d.file_name, d.file_path, d.file_size, 
             d.file_type, d.category, d.status, d.download_count, d.uploaded_by,
             d.library_id, d.created_at, d.updated_at,
             u.full_name as uploaded_by_name,
             l.name as library_name
      FROM documents d
      LEFT JOIN users u ON d.uploaded_by = u.id
      LEFT JOIN libraries l ON d.library_id = l.id
      WHERE d.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching document',
      error: error.message
    });
  }
};

// Create new document
exports.createDocument = async (req, res) => {
  try {
    const { 
      title, description, file_name, file_path, file_size, 
      file_type, uploaded_by, library_id, category 
    } = req.body;
    
    const query = `
      INSERT INTO documents (title, description, file_name, file_path, file_size, 
                           file_type, uploaded_by, library_id, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, title, description, file_name, file_size, file_type, 
                category, status, created_at
    `;
    
    const result = await pool.query(query, [
      title, description, file_name, file_path, file_size, 
      file_type, uploaded_by, library_id, category
    ]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, new_values, changed_by)
       VALUES ('documents', $1, 'create', $2, $3)`,
      [result.rows[0].id, JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.status(201).json({
      success: true,
      message: 'Document created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating document',
      error: error.message
    });
  }
};

// Update document
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, status } = req.body;
    
    // Get old values for logging
    const oldResult = await pool.query('SELECT * FROM documents WHERE id = $1', [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    const query = `
      UPDATE documents 
      SET title = $1, description = $2, category = $3, status = $4
      WHERE id = $5
      RETURNING id, title, description, category, status, updated_at
    `;
    
    const result = await pool.query(query, [title, description, category, status, id]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, new_values, changed_by)
       VALUES ('documents', $1, 'update', $2, $3, $4)`,
      [id, JSON.stringify(oldResult.rows[0]), JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'Document updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get document data for logging
    const documentResult = await pool.query('SELECT * FROM documents WHERE id = $1', [id]);
    if (documentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    await pool.query('DELETE FROM documents WHERE id = $1', [id]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, changed_by)
       VALUES ('documents', $1, 'delete', $2, $3)`,
      [id, JSON.stringify(documentResult.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting document',
      error: error.message
    });
  }
};
