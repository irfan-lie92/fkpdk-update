
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to database...');
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing schema migration...');
    await pool.query(schemaSQL);
    console.log('Schema migration completed successfully');

    // Read and execute seed data
    const seedPath = path.join(__dirname, '../database/seed.sql');
    if (fs.existsSync(seedPath)) {
      const seedSQL = fs.readFileSync(seedPath, 'utf8');
      console.log('Executing seed data...');
      await pool.query(seedSQL);
      console.log('Seed data inserted successfully');
    }

    console.log('Database migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
