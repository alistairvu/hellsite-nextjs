import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { userAtom } from '../../recoil';
import axiosClient from '../../api';
import AppHeader from '../app/AppHeader';

const AppLayout: React.FC = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const { pathname } = useRouter();

  useEffect(() => {
    const getStatus = async () => {
      try {
        const { data } = await axiosClient.get('/api/status');
        if (data.success) {
          setIsLoaded(true);
          if (data.loggedIn) {
            setUser({
              id: data.user.id,
              username: data.user.username,
              email: data.user.email,
            });
            window.localStorage.setItem('jwt', data.token);
          }
        }
      } catch (err) {
        setIsLoaded(true);
        console.error(err);
      }
    };

    getStatus();
  }, [setUser]);

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
