import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../recoil';
import axiosClient from '../../api';

const AppLayout: React.FC = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const setUser = useSetRecoilState(userAtom);

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

  return <>{children}</>;
};

export default AppLayout;
