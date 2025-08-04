import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URI, // ← use your URI here
});

const connect = async () => {
  try {
    console.log("Trying to connect DB");
    //   console.log(process.env.DB_URI); // Log the connection string for debugging
    const client = await pool.connect();
    console.log("Connected to DB");
    client.release();
  } catch (err) {
    console.error("Database connection error:", err);
    console.error("Please check your DB_URI in .env file");
  }
};

export default { pool, connect };
