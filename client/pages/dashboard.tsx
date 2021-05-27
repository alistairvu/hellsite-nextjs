import Head from 'next/head';
import { ProtectedPage } from '../components/pages';

const DashboardPage: React.FC = () => (
  <ProtectedPage>
    <Head>
      <title>Login</title>
    </Head>

    <div className="container">
      <h1 className="text-4xl font-bold">This is the login page!</h1>
    </div>
  </ProtectedPage>
);

export default DashboardPage;
