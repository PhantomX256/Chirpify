import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FileWithPath } from "react-dropzone";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface PostData {
  title: string;
  caption: string;
  file: FileWithPath | null;
  tags: string[];
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { setToast } = useAuth();

  const createPost = async (postData: PostData) => {
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

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
    onError: (error) => {
      setToast([
        "Error",
        error.message
          ? error.message
          : "An error occured while creating a post. Please try again later.",
      ]);
    },
  });
};
