import mysql, { Pool } from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
};

declare global {
  var mysqlPool: Pool | undefined;
}

if (!global.mysqlPool) {
  global.mysqlPool = mysql.createPool(dbConfig);
}

const pool: Pool = global.mysqlPool;

export default pool;
