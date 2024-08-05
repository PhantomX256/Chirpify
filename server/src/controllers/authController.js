// Importing Necessary Libraries
import bcrypt from "bcrypt";
import pool from "../config/db.js";

// Importing jwt functions
import { generateToken } from "../utils/jwtUtils.js";

// All logic for registering the user
export const registerUser = async (req, res) => {
  // Fetching all the credentials from the request body
  const { name, username, email, password } = req.body;

  try {
    // Check if the user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user credentials into the database
    const newUser = await pool.query(
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, email, hashedPassword]
    );

    // Generate the token
    const token = generateToken(newUser.rows[0].id);

    // Create a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400000,
    });

    // return user credentials
    res.status(201).json({
      user: newUser.rows[0],
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// All logic for logging in the user
export const loginUser = async (req, res) => {
  // Get the email and password from request body
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length === 0)
      return res.status(400).json({ error: "User does not exist" });

    // Store the user details
    const user = userExists.rows[0];

    // Compare the passwords
    const validPassword = bcrypt.compare(password, user.password);

    // Password is invalid
    if (!validPassword)
      return res.status(400).json({ error: "Invalid Password" });

    // Get other user details other than password
    const { password: userPassword, ...userDetails } = user;

    // Generate a webtoken
    const token = generateToken(user.id);

    // Create a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400000,
    });

    // return user details
    res.status(200).json({ user: userDetails, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// All logic for logging out a user
export const logoutUser = (req, res) => {
  // Clear browser cookie
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
