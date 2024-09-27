import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import Input from "../shared/Input";
import TextArea from "../shared/TextArea";
import FileUploader from "../shared/FileUploader";
import Button from "../shared/Button";
import {
  useCreatePost,
  useEditPost,
} from "../../lib/react-query/queriesAndMutations";
import { useAuth } from "../../lib/context/AuthContext";

type existingPostType = {
  id: number;
  title: string;
  caption: string;
  url: string;
  tags: string[];
};

interface PostFormProps {
  existingPost?: existingPostType;
}

const PostForm = ({ existingPost }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const {
    mutateAsync: editPost,
    isPending: isLoadingEdit,
    isError,
  } = useEditPost();

  const { setToast } = useAuth();

  // Form states
  const [title, setTitle] = useState(existingPost?.title ?? "");
  const [caption, setCaption] = useState(existingPost?.caption ?? "");
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [tags, setTags] = useState(existingPost?.tags?.join(",") ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // split the tags into an array of tags
    const tagArray = tags.split(",");

    if (existingPost) {
      const postData = {
        title,
        caption,
        file,
        id: existingPost.id,
        tags: tagArray,
      };
      await editPost(postData);

      if (isError)
        setToast(["Error", "An error occurred while editing a post"]);
    } else {
      const postData = {
        title,
        caption,
        file,
        tags: tagArray,
      };
      await createPost(postData);
    }
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={handleSubmit}
      >
        {/* Input Fields */}
        <Input
          type="text"
          label="Title"
          name="title"
          value={title}
          setState={setTitle}
          placeholder="Your awesome title"
        />
        <TextArea
          label="Caption"
          placeholder="Your awesome caption"
          value={caption}
          setState={setCaption}
        />
        <FileUploader
          label="Add Meme"
          url={existingPost?.url}
          value={file}
          setState={setFile}
        />
        <Input
          type="text"
          placeholder="Funny, Dark, Hilarious"
          label='Tags (separated by comma "," )'
          name="tags"
          value={tags}
          setState={setTags}
        />

        {/* Submit button */}
        <span style={{ display: "flex", alignSelf: "flex-end", gap: "15px" }}>
          <Button className="post-cancel-button" type="button">
            Cancel
          </Button>
          <Button className="post-submit-button" type="submit">
            {isLoadingCreate || isLoadingEdit ? "..." : "Submit"}
          </Button>
        </span>
      </form>
    </div>
  );
};

export default PostForm;
