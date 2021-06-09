import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import AppLayout from '../components/layout/AppLayout';
import '../styles/globals.css';

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <RecoilRoot>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </QueryClientProvider>
    </ChakraProvider>
  </RecoilRoot>
);

export default MyApp;
