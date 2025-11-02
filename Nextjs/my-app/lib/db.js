import mysql from "mysql2/promise";
let connection;
console.log(process.env.HOST_ENV, process.env.USERNAME, process.env.PASSWORD);

export async function connectToDatabase() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.HOST_ENV, // Accessing host from .env
      // port: 12083, // Port is hardcoded or can be in .env as well
      port: 3306, // Port is hardcoded or can be in .env as well
      user: "etraders_backend_user", // Accessing username from .env
      password: "HbOD^{hzDB*x6rdj", // Accessing password from .env
      // database: "defaultdb",
      database: "etraders_kbc",
    });
  }
  return connection;
}
