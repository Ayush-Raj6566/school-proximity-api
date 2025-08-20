import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// relax SSL verification for Railway public MySQL
const ssl =
  process.env.MYSQL_SSL === "true" || process.env.MYSQL_SSL === "relaxed"
    ? { rejectUnauthorized: false }
    : undefined;

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl,
});
