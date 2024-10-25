import mysql from "mysql2/promise";

// Create a function to establish a MySQL connection
export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Suigaise99',
      database: 'ntushop'
    });
    console.log("Database connection successful");
    return connection;
  } catch (error) {
    console.error("Database connection error", error);
    throw error;
  }
};