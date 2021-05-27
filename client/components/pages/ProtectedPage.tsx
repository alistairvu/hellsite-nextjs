import { useRecoilValue } from 'recoil';
import redirect from 'nextjs-redirect';
import { useRouter } from 'next/router';
import { userAtom } from '../../recoil';

const ProtectedPage: React.FC = ({ children }) => {
  const user = useRecoilValue(userAtom);
  const router = useRouter();

  if (user.id === 0) {
    const { pathname } = router;
    const Redirect = redirect(`/login?redirect=${pathname}`);
    return (
      <Redirect>
        <div />
      </Redirect>
    );
  }

  return <>{children}</>;
};

export default ProtectedPage;
