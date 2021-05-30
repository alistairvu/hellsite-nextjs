import { setCookie, destroyCookie } from 'nookies';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../recoil';

interface UserDataInterface {
  id: number;
  username: string;
  email: string;
}

interface UseAuthInterface {
  saveUser: (user: UserDataInterface, token: string) => void;
  deleteUser: () => void;
}

const useAuth = (): UseAuthInterface => {
  const setUser = useSetRecoilState(userAtom);

  const saveUser = (user: UserDataInterface, token: string): void => {
    setUser({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    window.localStorage.setItem('jwt', token);

    setCookie(null, 'access', token, {
      maxAge: 60 * 60 * 24,
      path: '/',
    });
  };

  const deleteUser = () => {
    setUser({
      id: 0,
      username: '',
      email: '',
    });
    window.localStorage.removeItem('jwt');
    destroyCookie(null, 'access');
  };

  return { saveUser, deleteUser };
};

export default useAuth;
