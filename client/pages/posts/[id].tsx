import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
import { serverClient } from '../../api';
import PostCard from '../../components/post/PostCard';

interface PostPageProps {
  post: PostInterface;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => (
  <div className="container">
    <PostCard {...post} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const { data } = await serverClient.get(`/api/posts/${id}`);

  if (!data.success) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data.post,
    },
  };
};

export default PostPage;
