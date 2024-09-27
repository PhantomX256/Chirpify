import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  createPost,
  editPost,
  getPostById,
  likePost,
  recentMemes,
  savePost,
  unlikePost,
  unsavePost,
} from "../api/apiFunctions";
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
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
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

export const useRecentMemes = () => {
  return useQuery({
    queryKey: ["recent-posts"],
    queryFn: recentMemes,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      isLiked,
    }: {
      postId: string;
      isLiked: boolean;
    }) => {
      if (isLiked) await unlikePost(postId);
      else await likePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      isSaved,
    }: {
      postId: string;
      isSaved: boolean;
    }) => {
      if (isSaved) await unsavePost(postId);
      else await savePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
    },
  });
};

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
    retry: 0,
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
      navigate("/");
    },
    onError: () => {
      console.log("An error occurred");
    },
  });
};
