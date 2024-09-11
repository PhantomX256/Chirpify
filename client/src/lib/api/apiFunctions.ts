import { CreatePostData } from "../react-query/queriesAndMutations";
import axios from "axios";

// This function hits the backend to create a post entry in the database
export const createPost = async (postData: CreatePostData) => {
  const filePostData = new FormData();
  if (!postData.file) throw new Error("File is required");
  filePostData.append("meme", postData.file);

  const imageResponse = await axios.post(
    "http://localhost:5000/api/app/file/upload",
    filePostData,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      withCredentials: true,
    }
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
    {
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      withCredentials: true,
    }
  );

  return postResponse.data;
};