import pool from "../config/db.js";

export const createPost = async (req, res) => {
  try {
    await pool.query("BEGIN");

    const date = new Date();

    // get the post data and image id from the request body
    const { title, caption, tags, imageId } = req.body;

    // get the user id from the authMiddleware
    const userId = req.userId;

    // Make entry into the posts table
    const postsQuery = await pool.query(
      "INSERT INTO posts (creator_id, caption, tags, title) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, caption, tags, title]
    );

    const postId = postsQuery.rows[0].id;

    // take the post_id and make entry to the post_photo_relation table
    await pool.query(
      "INSERT INTO posts_photo_relation (post_id, image_id) VALUES ($1, $2)",
      [postId, imageId]
    );

    await pool.query("COMMIT");

    console.log(
      `A post was created by user: ${
        req.userId
      } (createPost)  (${date.getHours()} : ${date.getMinutes()})`
    );

    // return the post results
    res.status(201).json(postsQuery.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ postError: "Server Error" });
  }
};
