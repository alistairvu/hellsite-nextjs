import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface RegisterData {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const AuthRegisterForm: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterData>({});
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = (registerData: RegisterData) => {
    setIsRegistering(true);
    console.log(registerData);
    setTimeout(() => setIsRegistering(false), 1000);
  };

  return (
    <form className="text-center" onSubmit={handleSubmit(handleRegister)}>
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

      <button
        type="submit"
        className="input-auth btn btn-primary btn-focus"
        disabled={isRegistering}
      >
        Register
      </button>
    </form>
  );
};

export default AuthRegisterForm;
