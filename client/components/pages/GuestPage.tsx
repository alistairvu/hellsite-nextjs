import { useRecoilValue } from 'recoil';
import redirect from 'nextjs-redirect';
import { userAtom } from '../../recoil';

const GuestPage: React.FC = ({ children }) => {
  const user = useRecoilValue(userAtom);

  if (user.id !== 0) {
    const Redirect = redirect(`/dashboard`);
    return (
      <Redirect>
        <div />
      </Redirect>
    );
  }

  return <>{children}</>;
};

export default GuestPage;
