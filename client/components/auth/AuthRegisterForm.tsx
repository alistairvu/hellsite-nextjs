import { useForm } from 'react-hook-form';

interface RegisterData {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const AuthRegisterForm: React.FC = () => {
  const { register } = useForm<RegisterData>({});

  return (
    <form className="text-center">
      <input
        className="input input-auth input-focus"
        type="text"
        name="username"
        placeholder="Username"
        {...register('username', { required: true })}
        required
      />
      <input
        className="input input-auth input-focus"
        type="email"
        name="email"
        placeholder="Email"
        {...register('email', { required: true })}
        required
      />
      <input
        className="input input-auth input-focus"
        type="password"
        name="password"
        placeholder="Password"
        {...register('password', { required: true })}
        required
      />
      <input
        className="input input-auth input-focus"
        type="password"
        name="passwordConfirmation"
        placeholder="Confirm your Password"
        {...register('passwordConfirmation', { required: true })}
        required
      />

      <button type="submit" className="input-auth btn btn-primary btn-focus">
        Register
      </button>
    </form>
  );
};

export default AuthRegisterForm;
