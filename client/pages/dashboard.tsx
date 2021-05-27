import Head from 'next/head';
import { ProtectedPage } from '../components/pages';

const DashboardPage: React.FC = () => (
  <ProtectedPage>
    <Head>
      <title>Login</title>
    </Head>

    <main className="container">
      <h1 className="font-bold text-4xl">This is the login page!</h1>
    </main>
  </ProtectedPage>
);

export default DashboardPage;
