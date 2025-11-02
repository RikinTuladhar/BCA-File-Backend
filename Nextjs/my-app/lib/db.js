import mysql from "mysql2/promise";

let connection;

export async function connectToDatabase() {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: process.env.HOST_ENV,
        port: 3306, // default MySQL port
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      });
      console.log("✅ Connected to MySQL");
    } catch (err) {
      console.error("❌ DB connection failed:", err.message);
      throw err;
    }
  }
  return connection;
}
