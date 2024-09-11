import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/apiFunctions";
import { FileWithPath } from "react-dropzone";

// interface for types of postdata
export interface CreatePostData {
  title: string;
  caption: string;
  file: FileWithPath | null;
  tags: string[];
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { setToast } = useAuth();

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
