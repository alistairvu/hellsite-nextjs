import AuthLayout from '../components/layout/AuthLayout';
import AuthRegisterForm from '../components/auth/AuthRegisterForm';

const RegisterPage: React.FC = () => (
  <AuthLayout isRegister>
    <AuthRegisterForm />
  </AuthLayout>
);

export default RegisterPage;
