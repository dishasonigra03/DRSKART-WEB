const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not defined in .env');
  console.error('👉 Please update .env with your PostgreSQL credentials.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function initDb() {
  const client = await pool.connect();
  try {
    console.log('🔄 Connecting to PostgreSQL database...');
    
    // Read and run setup.sql
    const setupSqlPath = path.resolve(__dirname, '../database/setup.sql');
    if (fs.existsSync(setupSqlPath)) {
      console.log('📄 Executing database/setup.sql...');
      let setupSql = fs.readFileSync(setupSqlPath, 'utf8');
      setupSql = setupSql.replace(/^\uFEFF/, '').replace(/[\uFFFD\0]+$/g, '').trim();
      await client.query(setupSql);
      console.log('✅ Base schema setup completed!');
    }

    // Run additional migrations
    console.log('🔄 Applying additional migrations...');
    const migrationsDir = path.resolve(__dirname, '../database/migrations');
    if (fs.existsSync(migrationsDir)) {
      const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.js') && f !== 'migrate.js');
      for (const file of files) {
        console.log(`➡️  Running migration: ${file}...`);
        try {
          const fullPath = path.join(migrationsDir, file);
          execSync(`node "${fullPath}"`, { stdio: 'inherit' });
        } catch (e) {
          console.warn(`⚠️ Migration ${file} note:`, e.message);
        }
      }
    }

    console.log('\n🎉 Database initialization finished successfully!');
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

initDb();
