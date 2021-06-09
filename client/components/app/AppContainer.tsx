import { Center, Box, BoxProps } from '@chakra-ui/react';

const AppContainer: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Center>
    <Box w={{ sm: 'xl', md: '2xl', lg: '3xl', xl: '4xl' }} {...rest}>
      {children}
    </Box>
  </Center>
);

export default AppContainer;
