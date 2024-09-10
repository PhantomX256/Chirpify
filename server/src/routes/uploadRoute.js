import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController.js";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialze the route
const router = Router();

// Initializing upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../public"));
  },
  filename: (req, file, cb) => {
    const date = new Date();

    // Get the file extension
    const fileExtension = path.extname(file.originalname);

    // Generate a unique filename
    const uniqueSuffix =
      Date.now() + "-" + crypto.randomBytes(6).toString("hex");
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    console.log(
      `A file was uploaded name: ${
        file.originalname
      } (multer)  (${date.getHours()} : ${date.getMinutes()})`
    );
  },
});

// Declaring upload const
const upload = multer({ storage });

// upload route init
router.post("/upload", upload.single("meme"), uploadFile);

export default router;
