import { Link } from "react-router-dom";

type PostDataType = {
  id: string;
  title: string;
  creator_id: string;
  url: string;
};

type GridMemeProps = {
  post: PostDataType;
};

const GridMeme = ({ post }: GridMemeProps) => {
  return (
      <div className="grid-meme-container">
        <img
          className="grid-meme-image"
          src={`http://localhost:5000/public/${post.url}`}
        />
        <Link to={`posts/${post.id}`}>
          <div className="grid-meme-content">
            <span className="grid-meme-title">{post.title}</span>
            <Link to={`profile/${post.creator_id}`}>
              <img
                width={25}
                height={25}
                src="../../public/assets/icons/profile.png"
              />
            </Link>
          </div>
        </Link>
      </div>
  );
};

export default GridMeme;
