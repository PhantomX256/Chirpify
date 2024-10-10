import { useEffect } from "react";
import GridMeme from "../../components/shared/GridMeme";
import { useGetSavedPost } from "../../lib/react-query/queriesAndMutations";
import { useAuth } from "../../lib/context/AuthContext";
import { TailSpin } from "react-loader-spinner";

type PostDataType = {
  id: string;
  title: string;
  creator_id: string;
  url: string;
};

const SavedPosts = () => {
  const { data: savedPosts, isLoading, isError, error } = useGetSavedPost();

  const { setToast } = useAuth();

  useEffect(() => {
    if (isError) setToast(["Error", error.message]);
  }, [isError]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <span>
          <TailSpin />
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <div className="saved-posts-container">
        <h2
          style={{
            fontFamily: "Montserrat",
            color: "#eeeeee",
            fontSize: "30px",
            marginBottom: "15px",
          }}
        >
          Saved Posts
        </h2>
        <div className="grid-container">
          {!savedPosts || savedPosts.length === 0
            ? <span style={{ fontFamily: "Montserrat", color: "#eeeeee", fontSize: '20px', textAlign: 'center' }}>No saved posts</span>
            : savedPosts.map((post: PostDataType) => {
                return <GridMeme key={post.id} post={post} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;
