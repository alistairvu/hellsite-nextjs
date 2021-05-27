import Head from 'next/head';
import { GuestPage } from '../components/pages';

const LoginPage: React.FC = () => (
  <GuestPage>
    <Head>
      <title>Login</title>
    </Head>

    <main className="container">
      <h1 className="font-bold text-4xl">This is the login page!</h1>
    </main>
  </GuestPage>
);

export default LoginPage;
