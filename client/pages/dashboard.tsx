import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import { ProtectedPage } from '../components/pages';
import { AppContainer } from '../components/app';

const DashboardPage: React.FC = () => (
  <ProtectedPage>
    <Head>
      <title>Login</title>
    </Head>

    <AppContainer py={2}>
      <Heading size="xl">Dashboard</Heading>
    </AppContainer>
  </ProtectedPage>
);

export default DashboardPage;
