const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const sqlFilePath = path.join(__dirname, 'migration_deal_tracking.sql');

(async () => {
    const client = await pool.connect();
    try {
        if (fs.existsSync(sqlFilePath)) {
            const sql = fs.readFileSync(sqlFilePath, 'utf8');
            console.log('Running deal tracking migration...');
            await client.query(sql);
            console.log('✅ Deal tracking migration completed!');
        } else {
            console.log('ℹ️ Deal tracking schema already active in base database.');
        }
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
})();
