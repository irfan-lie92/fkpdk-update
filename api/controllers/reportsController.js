
const pool = require('../config/database');

// Get all reports with pagination
exports.getAllReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const type = req.query.type || '';
    const status = req.query.status || '';

    let whereClause = 'WHERE 1=1';
    const queryParams = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND r.title ILIKE $${paramCount}`;
      queryParams.push(`%${search}%`);
    }

    if (type) {
      paramCount++;
      whereClause += ` AND r.type = $${paramCount}`;
      queryParams.push(type);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND r.status = $${paramCount}`;
      queryParams.push(status);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM reports r ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalItems = parseInt(countResult.rows[0].count);

    // Get reports with admin and library information
    paramCount++;
    const dataQuery = `
      SELECT r.id, r.title, r.type, r.status, r.report_period_start, 
             r.report_period_end, r.created_at, r.updated_at,
             a.full_name as generated_by_name,
             l.name as library_name
      FROM reports r
      LEFT JOIN admins a ON r.generated_by = a.id
      LEFT JOIN libraries l ON r.library_id = l.id
      ${whereClause}
      ORDER BY r.created_at DESC
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
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// Get report by ID
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT r.id, r.title, r.type, r.content, r.data, r.status, 
             r.report_period_start, r.report_period_end, r.generated_by,
             r.library_id, r.created_at, r.updated_at,
             a.full_name as generated_by_name,
             l.name as library_name
      FROM reports r
      LEFT JOIN admins a ON r.generated_by = a.id
      LEFT JOIN libraries l ON r.library_id = l.id
      WHERE r.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching report',
      error: error.message
    });
  }
};

// Create new report
exports.createReport = async (req, res) => {
  try {
    const { 
      title, type, content, data, library_id, 
      report_period_start, report_period_end 
    } = req.body;
    
    const query = `
      INSERT INTO reports (title, type, content, data, generated_by, library_id, 
                         report_period_start, report_period_end)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, title, type, status, report_period_start, 
                report_period_end, created_at
    `;
    
    const result = await pool.query(query, [
      title, type, content, JSON.stringify(data), req.user?.id || 1, 
      library_id, report_period_start, report_period_end
    ]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, new_values, changed_by)
       VALUES ('reports', $1, 'create', $2, $3)`,
      [result.rows[0].id, JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating report',
      error: error.message
    });
  }
};

// Update report
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, type, content, data, status, 
      report_period_start, report_period_end 
    } = req.body;
    
    // Get old values for logging
    const oldResult = await pool.query('SELECT * FROM reports WHERE id = $1', [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const query = `
      UPDATE reports 
      SET title = $1, type = $2, content = $3, data = $4, status = $5, 
          report_period_start = $6, report_period_end = $7
      WHERE id = $8
      RETURNING id, title, type, status, report_period_start, 
                report_period_end, updated_at
    `;
    
    const result = await pool.query(query, [
      title, type, content, JSON.stringify(data), status, 
      report_period_start, report_period_end, id
    ]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, new_values, changed_by)
       VALUES ('reports', $1, 'update', $2, $3, $4)`,
      [id, JSON.stringify(oldResult.rows[0]), JSON.stringify(result.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating report',
      error: error.message
    });
  }
};

// Delete report
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get report data for logging
    const reportResult = await pool.query('SELECT * FROM reports WHERE id = $1', [id]);
    if (reportResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    await pool.query('DELETE FROM reports WHERE id = $1', [id]);
    
    // Log activity
    await pool.query(
      `INSERT INTO activity_logs (table_name, record_id, action, old_values, changed_by)
       VALUES ('reports', $1, 'delete', $2, $3)`,
      [id, JSON.stringify(reportResult.rows[0]), req.user?.id || 1]
    );

    res.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting report',
      error: error.message
    });
  }
};
