import { GetServerSideProps } from 'next';
import nookies from 'nookies';
// import { useRouter } from 'next/router';
import { serverClient } from '../../api';
import PostCard from '../../components/post/PostCard';

interface PostPageProps {
  post: PostInterface;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => (
  <div className="container py-2">
    <PostCard {...post} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const cookies = nookies.get(ctx);
  const authorization = cookies.jwt ? { Authorization: cookies.jwt } : {};

  const { data } = await serverClient.get(`/api/posts/${id}`, {
    headers: authorization,
  });

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
