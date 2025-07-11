
const pool = require('../config/database');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const queries = [
      // Total perpustakaan (approved libraries)
      `SELECT COUNT(*) as total_libraries FROM libraries WHERE status = 'approved'`,
      
      // Pengguna aktif (active users who logged in within last 30 days)
      `SELECT COUNT(*) as active_users FROM users 
       WHERE status = 'active' AND last_login >= NOW() - INTERVAL '30 days'`,
      
      // Diskusi aktif (active discussions)
      `SELECT COUNT(*) as active_discussions FROM discussions WHERE status = 'active'`,
      
      // Kegiatan bulan ini (events this month)
      `SELECT COUNT(*) as monthly_events FROM events 
       WHERE event_date >= DATE_TRUNC('month', CURRENT_DATE) 
       AND event_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`
    ];

    const results = await Promise.all(queries.map(query => pool.query(query)));
    
    const stats = {
      totalLibraries: parseInt(results[0].rows[0].total_libraries),
      activeUsers: parseInt(results[1].rows[0].active_users),
      activeDiscussions: parseInt(results[2].rows[0].active_discussions),
      monthlyEvents: parseInt(results[3].rows[0].monthly_events)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

// Get recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const query = `
      SELECT 
        al.action,
        al.table_name,
        al.created_at,
        a.full_name as admin_name,
        al.new_values
      FROM activity_logs al
      LEFT JOIN admins a ON al.changed_by = a.id
      ORDER BY al.created_at DESC
      LIMIT 10
    `;

    const result = await pool.query(query);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activities',
      error: error.message
    });
  }
};

// Get pending approvals
exports.getPendingApprovals = async (req, res) => {
  try {
    const queries = [
      // Pending library registrations
      `SELECT 'library' as type, id, name as title, 'Registrasi Perpustakaan' as approval_type, created_at 
       FROM libraries WHERE status = 'pending'`,
      
      // Pending documents
      `SELECT 'document' as type, id, title, 'Upload Dokumen' as approval_type, created_at 
       FROM documents WHERE status = 'pending'`,
      
      // Scheduled events (can be considered as pending approvals)
      `SELECT 'event' as type, id, title, 'Jadwal Kegiatan' as approval_type, created_at 
       FROM events WHERE status = 'scheduled' AND event_date > CURRENT_DATE`
    ];

    const results = await Promise.all(queries.map(query => pool.query(query)));
    
    const pendingItems = [];
    results.forEach(result => {
      pendingItems.push(...result.rows);
    });

    // Sort by creation date
    pendingItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json({
      success: true,
      data: pendingItems.slice(0, 10) // Limit to 10 items
    });
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending approvals',
      error: error.message
    });
  }
};
