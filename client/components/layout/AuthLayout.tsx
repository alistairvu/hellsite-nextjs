import { HellsiteSmallLogo, HellsiteFullLogo } from '../icons';
import { GuestPage } from '../pages';

interface AuthLayoutProps {
  isRegister?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ isRegister, children }) => (
  <GuestPage>
    <div className="flex flex-col w-screen h-screen">
      <header className="p-2 shadow">
        <div className="container flex items-center justify-between">
          <div className="w-8 h-8 p-1">
            <HellsiteSmallLogo />
          </div>

          <div>
            <button className="btn btn-primary btn-focus" type="button">
              {isRegister ? 'Login' : 'Register'}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center h-full px-4 md:container">
          <div className="grid w-full md:grid-cols-3">
            <div className="md:col-start-2 md:col-span-1">
              <div className="flex flex-col items-center justify-center p-2 rounded shadow">
                <div className="w-40 mb-2">
                  <HellsiteFullLogo />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </GuestPage>
);

export default AuthLayout;
