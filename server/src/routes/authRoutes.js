// Importing router from express
import { Router } from "express";
const router = Router();

// Importing necessary logic for the route
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";

// Register route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Logout Route
router.post("/logout", logoutUser);

export default router;
