import { Router } from "express";
import { createPost, editPost, getPost, likePost, recentPosts, savePost, unlikePost, unsavePost } from "../controllers/postController.js";

const router = Router();

// for creating post
router.post("/create", createPost);

// for getting recent-posts
router.post("/recent-posts", recentPosts);

// for liking a post
router.post("/like", likePost);

// for unliking a post
router.post("/unlike", unlikePost);

// for saving a post
router.post("/save", savePost);

// for unsaving a post
router.post("/unsave", unsavePost);

// for getting post details
router.post("/get", getPost);

router.post("/edit", editPost);

export default router;
