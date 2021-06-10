import { useContext, createContext } from 'react';
import { Box, Text } from '@chakra-ui/react';

const PostContext = createContext(null);

const PostHeader: React.FC = () => {
  const { post } = useContext(PostContext);

  return (
    <Box px={4} py={2} borderBottomWidth={2} borderColor="gray.100">
      <Text fontWeight={600}>{post.user.username}</Text>
    </Box>
  );
};

const PostBody: React.FC = () => {
  const { post } = useContext(PostContext);

  return (
    <Box px={4} py={2}>
      <Text>{post.content}</Text>
    </Box>
  );
};

const PostCard: React.FC<PostInterface> = (props) => {
  const post = props;

  return (
    <PostContext.Provider value={{ post }}>
      <Box borderWidth={2} borderColor="gray.100" borderRadius="0.125rem">
        <PostHeader />
        <PostBody />
      </Box>
    </PostContext.Provider>
  );
};

export default PostCard;
