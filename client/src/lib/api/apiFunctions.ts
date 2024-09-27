import { CreatePostData } from "../react-query/queriesAndMutations";
import { apiHeaders } from "../../constants";
import axios from "axios";
import { FileWithPath } from "react-dropzone";

type PostDataType = {
  id: number;
  caption: string;
  title: string;
  tags: string[];
  file?: FileWithPath | null;
};

// This function hits the backend to create a post entry in the database
export const createPost = async (postData: CreatePostData) => {
  const filePostData = new FormData();
  if (!postData.file) throw new Error("File is required");
  filePostData.append("meme", postData.file);

  const imageResponse = await axios.post(
    "http://localhost:5000/api/app/file/upload",
    filePostData,
    apiHeaders
  );

  const imageId = imageResponse.data.id;

  const postResponse = await axios.post(
    "http://localhost:5000/api/app/posts/create",
    {
      title: postData.title,
      caption: postData.caption,
      tags: postData.tags,
      imageId: imageId,
    },
    apiHeaders
  );

  return postResponse.data;
};

// Hits the backend to get recent memes
export const recentMemes = async () => {
  try {
    const recentPostsResponse = await axios.post(
      "http://localhost:5000/api/app/posts/recent-posts",
      null,
      apiHeaders
    );

    return recentPostsResponse.data;
  } catch (err) {
    throw new Error("An error occurred while fetching recent posts");
  }
};

// Hits the backend to like a post
export const likePost = async (postId: string) => {
  try {
    await axios.post(
      "http://localhost:5000/api/app/posts/like",
      { postId: postId },
      apiHeaders
    );
  } catch (err) {
    throw new Error("An error occurred while liking post");
  }
};

export const unlikePost = async (postId: string) => {
  try {
    await axios.post(
      "http://localhost:5000/api/app/posts/unlike",
      { postId: postId },
      apiHeaders
    );
  } catch (err) {
    throw new Error("An error occurred while unliking post");
  }
};

export const savePost = async (postId: string) => {
  try {
    await axios.post(
      "http://localhost:5000/api/app/posts/save",
      { postId: postId },
      apiHeaders
    );
  } catch (err) {
    throw new Error("An error occurred while saving post");
  }
};

export const unsavePost = async (postId: string) => {
  try {
    await axios.post(
      "http://localhost:5000/api/app/posts/unsave",
      { postId: postId },
      apiHeaders
    );
  } catch (err) {
    throw new Error("An error occurred while unsaving post");
  }
};

export const getPostById = async (postId: string) => {
  try {
    const getPostResponse = await axios.post(
      "http://localhost:5000/api/app/posts/get",
      {
        postId: postId,
      },
      apiHeaders
    );

    return getPostResponse.data;
  } catch (err) {
    throw new Error("An error occurred while fetching post by ID");
  }
};

export const editPost = async (postData: PostDataType) => {
  try {
    let newImageId = null;

    if (postData.file) {
      const filePostData = new FormData();
      filePostData.append("meme", postData.file);

      const imageResponse = await axios.post(
        "http://localhost:5000/api/app/file/upload",
        filePostData,
        apiHeaders
      );

      newImageId = imageResponse.data.id;
    }

    await axios.post(
      "http://localhost:5000/api/app/posts/edit",
      {
        postId: postData.id,
        caption: postData.caption,
        title: postData.title,
        tags: postData.tags,
        newImageId: newImageId,
      },
      apiHeaders
    );
  } catch (error) {
    throw new Error("An Error Occurred Editing Post");
  }
};