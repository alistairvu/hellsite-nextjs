import { useContext, createContext } from 'react';

const PostContext = createContext(null);

const PostHeader: React.FC = () => {
  const { post } = useContext(PostContext);

  return (
    <div className="px-4 py-2 border-b-2 border-gray-100">
      <h1 className="font-semibold">{post.user.username}</h1>
    </div>
  );
};

const PostBody: React.FC = () => {
  const { post } = useContext(PostContext);

  return (
    <div className="px-4 py-2">
      <h1 className="whitespace-pre-line">{post.content}</h1>
    </div>
  );
};

const PostCard: React.FC<PostInterface> = (props) => {
  const post = props;

  return (
    <PostContext.Provider value={{ post }}>
      <div className="border-2 border-gray-100 rounded-sm">
        <PostHeader />
        <PostBody />
      </div>
    </PostContext.Provider>
  );
};

export default PostCard;
