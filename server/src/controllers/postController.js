import pool from "../config/db.js";

// This controller takes the post data and makes an entry to the posts table
// then it takes the post_id and image_id and makes an entry into the
// posts_photo_relations table
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
      } (createPost)  (${date.getHours()}:${date.getMinutes()})`
    );

    // return the post results
    res.status(201).json(postsQuery.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ postError: "Server Error" });
  }
};

// This function return the last 20 recent posts
export const recentPosts = async (req, res) => {
  const date = new Date();

  try {
    // get the posts along with their images and associated users from the db
    const recentPostsQuery = await pool.query(
      "SELECT p.id, p.creator_id, p.title, p.caption, p.tags, p.created_at, i.url, u.username, (SELECT COUNT(*) FROM likes l2 WHERE l2.post_id = p.id) AS like_count, CASE WHEN l.user_id IS NULL THEN FALSE ELSE TRUE END AS is_liked, CASE WHEN s.user_id IS NULL THEN FALSE ELSE TRUE END AS is_saved FROM posts p JOIN posts_photo_relation pr ON p.id = pr.post_id JOIN images i ON i.id = pr.image_id JOIN users u ON u.id = p.creator_id LEFT JOIN likes l ON p.id = l.post_id AND l.user_id = $1 LEFT JOIN saves s ON p.id = s.post_id AND s.user_id = $1 ORDER BY p.created_at DESC LIMIT 20;",
      [req.userId]
    );

    console.log(
      `recent posts sent to user: ${
        req.userId
      } (recentPosts)  (${date.getHours()}:${date.getMinutes()})`
    );
    // return the results
    res.status(200).json(recentPostsQuery.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting recent posts" });
  }
};

// like post function
export const likePost = async (req, res) => {
  const date = new Date();

  try {
    // get userId and postId from req.body
    const userId = req.userId;
    const postId = req.body.postId;

    // Insert into database
    await pool.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [
      userId,
      postId,
    ]);

    console.log(
      `User: ${userId} liked Post: ${postId}  (unlikePost)  (${date.getHours()}:${date.getMinutes()})`
    );

    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while liking post" });
  }
};

// unlike logic
export const unlikePost = async (req, res) => {
  const date = new Date();

  try {
    const userId = req.userId;
    const postId = req.body.postId;

    await pool.query("DELETE FROM likes WHERE user_id=$1 AND post_id=$2", [
      userId,
      postId,
    ]);

    console.log(
      `User: ${userId} unliked Post: ${postId}  (likePost)  (${date.getHours()}:${date.getMinutes()})`
    );

    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while unliking post" });
  }
};

// save logic
export const savePost = async (req, res) => {
  const date = new Date();

  try {
    const userId = req.userId;
    const postId = req.body.postId;

    await pool.query("INSERT INTO saves VALUES ($1, $2)", [userId, postId]);

    console.log(
      `User: ${userId} saved Post: ${postId}  (savePost)  (${date.getHours()}:${date.getMinutes()})`
    );

    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while saving post" });
  }
};

// unsave logic
export const unsavePost = async (req, res) => {
  const date = new Date();

  try {
    const userId = req.userId;
    const postId = req.body.postId;

    await pool.query("DELETE FROM saves WHERE user_id=$1 AND post_id=$2", [
      userId,
      postId,
    ]);

    console.log(
      `User: ${userId} unsaved Post: ${postId}  (unsavePost)  (${date.getHours()}:${date.getMinutes()})`
    );
    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while unsaving post" });
  }
};

// get post logic
export const getPost = async (req, res) => {
  const date = new Date();

  try {
    const postId = req.body.postId;

    const getPostResponse = await pool.query(
      "SELECT p.*, i.url FROM posts p JOIN posts_photo_relation ppr ON p.id=ppr.post_id JOIN images i ON ppr.image_id=i.id WHERE p.id=$1",
      [postId]
    );

    console.log(
      `User: ${
        req.userId
      } requested Post: ${postId}  (getPost)  (${date.getHours()}:${date.getMinutes()})`
    );

    res.status(200).json(getPostResponse.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching a post" });
  }
};

//edit post
export const editPost = async (req, res) => {
  const date = new Date();

  try {
    const { postId, title, caption, tags, newImageId } = req.body;
    const userId = req.userId;

    // Begin transaction
    await pool.query("BEGIN");

    // Update post
    await pool.query(
      "UPDATE posts SET caption = $1, tags = $2, title = $3 WHERE id = $4",
      [caption, tags, title, postId]
    );

    // If imageId is sent meaning that image has changed. add new image.
    if (newImageId) {
      const imageResponse = await pool.query(
        "SELECT image_id FROM posts_photo_relation WHERE post_id = $1",
        [postId]
      );

      const imageId = imageResponse.rows[0].image_id;

      // Delete old images
      await pool.query("DELETE FROM posts_photo_relation WHERE post_id = $1", [
        postId,
      ]);

      // Delete old image from database
      await pool.query("DELETE FROM images WHERE id = $1", [imageId]);

      await pool.query(
        "INSERT INTO posts_photo_relation (post_id, image_id) VALUES ($1, $2)",
        [postId, newImageId]
      );
    }

    // Commit transaction
    await pool.query("COMMIT");

    console.log(
      `User: ${userId} edited Post: ${postId}  (editPost)  (${date.getHours()}:${date.getMinutes()})`
    );

    return res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while editing post" });
  }
};
