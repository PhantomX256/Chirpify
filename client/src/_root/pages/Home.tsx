import { TailSpin } from "react-loader-spinner";
import { useRecentMemes } from "../../lib/react-query/queriesAndMutations";
import { useAuth } from "../../lib/context/AuthContext.tsx";
import { useEffect } from "react";
import MemeCard from "../../components/shared/MemeCard.tsx";

export type MemeData = {
  id: string;
  creator_id: string;
  title: string;
  caption: string;
  url: string;
  tags: string[];
  username: string;
  created_at: string;
  is_liked: boolean;
  like_count: number;
  is_saved: boolean;
}

const Home = () => {
  const { setToast } = useAuth();
  const { data: memes, isPending: isPostLoading, isError, error } = useRecentMemes();

  useEffect(() => {
    if (isError) setToast(["Error", error.message]);
  }, [isError])

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <div style={{ display: "flex", flex: "1", padding: "20px", flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
        <h2 style={{ fontFamily: 'Montserrat', fontSize: '30px', color: '#eeeeee' }}>Home Feed</h2>
        {isPostLoading && !memes ? (
          <span style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <TailSpin width={100} />
          </span>
        ) : (
          <ul style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
            {memes.map((meme: MemeData) => {
              return (
                <MemeCard key={meme.url} meme={meme} />
              )
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
