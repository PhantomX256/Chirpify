// Importing router from express
import { Router } from "express";
const router = Router();

// Importing necessary logic for the route
import { registerUser, loginUser, logoutUser, getUser } from "../controllers/authController.js";

// Register route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Logout Route
router.post("/logout", logoutUser);

// Get User Route
router.get('/me', getUser);

export default router;
