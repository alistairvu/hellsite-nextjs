import { useContext, createContext } from 'react';

const PostContext = createContext(null);

const PostHeader: React.FC = () => {
  const { post } = useContext(PostContext);

  return (
    <div className="p-2 border-t-2 border-gray-100">
      <h1 className="font-semibold">{post.user.username}</h1>
    </div>
  );
};

const PostCard: React.FC<PostInterface> = (props) => {
  const post = props;

  return (
    <PostContext.Provider value={{ post }}>
      <div className="lg:rounded-sm">
        <PostHeader />
      </div>
    </PostContext.Provider>
  );
};

export default PostCard;
