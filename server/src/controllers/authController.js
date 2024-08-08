// Importing Necessary Libraries
import bcrypt from "bcrypt";
import pool from "../config/db.js";

// Importing jwt functions
import { generateToken, verifyToken } from "../utils/jwtUtils.js";
import { validateSignUpCredentials } from "../utils/formValidation.js";

// All logic for registering the user
export const registerUser = async (req, res) => {
  const date = new Date();

  // Fetching all the credentials from the request body
  const { name, username, email, password, confirmPassword } = req.body;

  // validates all the credentials
  if (
    !validateSignUpCredentials(name, username, password, confirmPassword, res)
  ) {
    console.log(
      `Credentials were invalid  (${date.getHours()}:${date.getMinutes()})`
    );
    return;
  }
  try {
    // Check if the user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      console.log(
        `User already exists  (${date.getHours()}:${date.getMinutes()})`
      );
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user credentials into the database
    const newUser = await pool.query(
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, email, hashedPassword]
    );
    console.log(
      `User added to database  (${date.getHours()}:${date.getMinutes()})`
    );

    // Generate the token
    const token = generateToken(newUser.rows[0].id);

    console.log(
      `Token was returned  (${date.getHours()}:${date.getMinutes()})`
    );

    // return user credentials
    res.status(201).json({
      user: newUser.rows[0],
      token: token,
    });
  } catch (err) {
    console.log(
      `A fatal error occured at ${date.getHours()}:${date.getMinutes()}`
    );
    res.status(500).json({ error: "Server error" });
  }
};

// All logic for logging in the user
export const loginUser = async (req, res) => {
  const date = new Date();

  // Get the email and password from request body
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length === 0) {
      console.log(
        `User did not exist  (${date.getHours()}:${date.getMinutes()})`
      );
      return res.status(400).json({ error: "User does not exist" });
    }
    // Store the user details
    const user = userExists.rows[0];

    // Compare the passwords
    const validPassword = bcrypt.compare(password, user.password);

    // Password is invalid
    if (!validPassword) {
      console.log(
        `Password was invalid  (${date.getHours()}:${date.getMinutes()})`
      );
      return res.status(400).json({ error: "Invalid Password" });
    }

    // Get other user details other than password
    const { password: userPassword, ...userDetails } = user;

    // Generate a webtoken
    const token = generateToken(user.id);

    console.log(
      `User ${
        userDetails.id
      } was logged in  (${date.getHours()}:${date.getMinutes()})`
    );

    // return user details
    res.status(200).json({ user: userDetails, token: token });
  } catch (err) {
    console.log(
      `A fatal error occured at ${date.getHours()}:${date.getMinutes()}`
    );
    res.status(500).json({ error: "Server error" });
  }
};

// All logic for logging out a user
export const logoutUser = (req, res) => {
  const date = new Date();

  console.log(`User was logged out  (${date.getHours()}:${date.getMinutes()})`);

  // Clear browser cookie
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Function to get user used for checking the user
export const getUser = async (req, res) => {
  const date = new Date();

  // get the token from cookie
  const token = req.cookies.token;

  // Token isn't there
  if (!token) {
    console.log(`Token wasn't sent (from getUser)  (${date.getHours()}:${date.getMinutes()})`);
    return res.status(201).json({ user: null });
  }

  try {
    // Decode the web token
    const decoded = verifyToken(token);

    // token is invalid
    if (!decoded) {
      console.log(
        `Token was invalid (from getUser)  (${date.getHours()}:${date.getMinutes()})`
      );
      return res.status(201).json({ user: null });
    }

    // Get the user details from the database
    const userDetails = await pool.query(
      "SELECT id, name, username, email FROM users WHERE id = $1",
      [decoded.userId]
    );

    // user does not exist
    if (userDetails.rows.length === 0) {
      console.log(
        `User does not exist (from getUser)  (${date.getHours()}:${date.getMinutes()})`
      );
      return res.status(204).json({ user: null });
    }

    console.log(
      `User details were sent (from getUser)  (${date.getHours()}:${date.getMinutes()})`
    );
    
    // Return the user details`
    res.status(200).json({ user: userDetails.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
