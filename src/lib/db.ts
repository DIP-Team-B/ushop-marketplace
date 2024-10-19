import mysql from "mysql2/promise";

// Create a function to establish a MySQL connection
export const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xxxx',
    database: 'ntushop'
  });
};