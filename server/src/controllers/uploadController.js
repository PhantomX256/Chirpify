import pool from "../config/db.js";

// all logic for uploading a file
export const uploadFile = async (req, res) => {
  try {
    const date = new Date();

    const imagePath = req.file.path;

    const imageResponse = await pool.query(
      "INSERT INTO images (url) VALUES ($1) RETURNING *",
      [imagePath]
    );

    console.log(
      `A file was addedd to database: ${
        req.file.originalname
      } (uploadControler)  (${date.getHours()} : ${date.getMinutes()})`
    );

    return res.status(201).json({ id: imageResponse.rows[0].id });
  } catch (err) {
    res.status(500).json({ imageError: "Server Error" });
  }
};
