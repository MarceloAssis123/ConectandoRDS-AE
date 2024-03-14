import { Pool } from 'pg';
import('dotenv/config');

const pool = new Pool({
  user: 'postgres',
  host: 'conectandodb-ae.cl0u0geyea27.sa-east-1.rds.amazonaws.com',
  database: 'aedb',
  password: 'postgres123',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default (text: string, params?: any[]) => pool.query(text, params);
