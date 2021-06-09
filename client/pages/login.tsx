import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import { GuestPage } from '../components/pages';
import { AppContainer } from '../components/app';

const LoginPage: React.FC = () => (
  <GuestPage>
    <Head>
      <title>Login</title>
    </Head>

    <AppContainer py={2}>
      <Heading size="xl">Login</Heading>
    </AppContainer>
  </GuestPage>
);

export default LoginPage;
