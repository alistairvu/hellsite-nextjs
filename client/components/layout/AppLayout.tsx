import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { publicClient } from '../../api';
import { useAuth } from '../../hooks';
import AppHeader from '../app/AppHeader';

const AppLayout: React.FC = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useRouter();
  const { saveUser } = useAuth();

  useEffect(() => {
    const getStatus = async () => {
      try {
        const { data } = await publicClient.get('/api/status');
        if (data.success) {
          setIsLoaded(true);
          if (data.loggedIn) {
            saveUser(data.user, data.token);
          }
        }
      } catch (err) {
        setIsLoaded(true);
        console.error(err);
      }
    };

    getStatus();
  }, [saveUser]);

  if (!isLoaded) {
    return null;
  }

  const PATHNAMES_TO_HIDE_HEADER = ['/login', '/register'];

  return (
    <div className="static">
      {PATHNAMES_TO_HIDE_HEADER.includes(pathname) === false && <AppHeader />}

      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
