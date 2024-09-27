import { useNavigate, useParams } from "react-router-dom";
import { useGetPostById, useLikePost, useSavePost } from "../../lib/react-query/queriesAndMutations";
import { TailSpin } from "react-loader-spinner";
import { useAuth } from "../../lib/context/AuthContext";
import { useEffect, useState } from "react";
import { SvgIcon } from "../../components";

const PostDetails = () => {
  // get the id from the url
  const { id } = useParams();
  const { setToast } = useAuth();
  const navigate = useNavigate();

  // all icons
  const unlikedIcon = ['M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z'];
  const likedIcon = ['M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z'];
  
  const savedIcon = ['M15.0309 3.30271C13.0299 2.8991 10.9701 2.8991 8.96913 3.30271C6.66186 3.76809 5 5.82231 5 8.20894V18.6292C5 20.4579 6.9567 21.596 8.51221 20.6721L11.3451 18.9895C11.7496 18.7492 12.2504 18.7492 12.6549 18.9895L15.4878 20.6721C17.0433 21.596 19 20.4579 19 18.6292V8.20894C19 5.82231 17.3381 3.76809 15.0309 3.30271Z']

  // get the post by id
  const { data: meme, isLoading, error } = useGetPostById(id || "");

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();

  // if an error occurs then this will handle it
  useEffect(() => {
    if (error) {
      setToast(["Error", error.message]);
    }
    if (meme) {
      setIsLiked(meme.is_liked);
      setIsSaved(meme.is_saved);
    }
  }, [error, meme])

  // while the meme data is being fetched display a loader
  if (isLoading) return(
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <TailSpin width="100px" height="100px" />
      </div>
  )

  // if no meme is found or an error occurs then return nothing
  if (error || !meme) {
    return null;
  }

  const handleLike = () => {
    likePost({ postId: meme.id, isLiked: isLiked }, {
      onSuccess: () => setIsLiked(!isLiked),
      onError: () => setToast(['Error', 'There was an error liking the post'])
    });
  }

  const handleSave = () => {
    savePost({ postId: meme.id, isSaved: isSaved }, {
      onSuccess: () => {setIsSaved(!isSaved); setToast(['Success', `Meme ${meme.id} was successfully ${isSaved ? 'unsaved' : 'saved'}`])},
      onError: () => setToast(['Error', 'There was an error saving the post'])
    })
  }


  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <div className="post-details-container">
        {/* Image */}
        <img className="post-details-image" src={`http://localhost:5000/public/${meme.url}`} />

        {/* Content */}
        <div className="post-details-content">
          <span>
            {/* Heading */}
            <h2 className="post-details-heading">{meme?.title}</h2>
            
            {/* Caption */}
            <p className="post-details-caption">{meme?.caption}</p>
          </span>

          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* User */}
            <span onClick={() => navigate(`/profile/${meme.creator_id}`)} style={{ display: "flex", alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <img width={20} height={20} src="../../public/assets/icons/profile.png" />
              <p style={{ fontFamily: 'Russo One', fontSize: '15px', color: '#76abae' }}>@{meme?.username}</p>
            </span>
            <span style={{ display: "flex", alignItems: 'center', gap: '5px' }}>
              <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={handleLike}>
                <SvgIcon fill={isLiked ? "red" : "#76abae"} width="30px" height="30px" path={isLiked ? likedIcon : unlikedIcon} viewbox="0 0 24 24" />
                <p style={{ fontSize: '18px', fontFamily: 'Russo One', fontWeight: '100', color: '#eeeeee' }}>{meme.like_count}</p>
              </span>
              <span style={{ cursor: 'pointer' }} onClick={handleSave}>
                <SvgIcon fill={isSaved ? "#eeeeee" : "rgba(118, 171, 174, 0.3)"} width="30px" height="30px" path={savedIcon} viewbox="0 0 24 24" />
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
