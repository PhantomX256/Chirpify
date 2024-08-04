// Importing Necessary Libraries
import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const registerUser = async (req, res) => {
  // Fetching all the credentials from the request body
  const { name, username, email, password } = req.body;

  try {
    /*
    // Check if the user exists
    const userExists = await pool.query(
      `SELECT * FROM users WHERE email = ${email}`
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user credentials into the database
    const newUser = await pool.query(
      `INSERT INTO users (name, username, email, password) VALUES (${name}, ${username}, ${email}, ${hashedPassword})`
    );
    */
    res.status(201).json({ name: name, username: username, email: email, password: password});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
