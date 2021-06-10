import { Flex, Button, Box } from '@chakra-ui/react';
import { HellsiteSmallLogo, HellsiteFullLogo } from '../icons';
import { GuestPage } from '../pages';

interface AuthLayoutProps {
  isRegister?: boolean;
}

const AuthHeader: React.FC<AuthLayoutProps> = ({ isRegister }) => (
  <Flex as="header" p="2" shadow="base" align="center" justify="space-between">
    <Flex w={8} h={8} p={1} align="center">
      <HellsiteSmallLogo />
    </Flex>

    <Button type="button" colorScheme="red">
      {isRegister ? 'Login' : 'Register'}
    </Button>
  </Flex>
);

const AuthLayout: React.FC<AuthLayoutProps> = ({ isRegister, children }) => (
  <GuestPage>
    <Flex direction="column" height="100vh" width="100%">
      <AuthHeader isRegister={isRegister} />
      <Flex
        flexGrow={1}
        direction="column"
        align="center"
        justify="center"
        h="100%"
        px={4}
      >
        <Flex
          direction="column"
          shadow="base"
          borderRadius="0.125rem"
          justify="center"
          align="center"
          p={4}
          w={{ base: '100%', md: '33%' }}
        >
          <Box w={40} mb={2}>
            <HellsiteFullLogo />
          </Box>
          <Box w="100%">{children}</Box>
        </Flex>
      </Flex>
    </Flex>
  </GuestPage>
);

export default AuthLayout;
