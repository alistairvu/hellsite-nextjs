import { useState } from 'react';
import { FormControl, Input, Button } from '@chakra-ui/react';
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
    <form onSubmit={handleSubmit(handleRegister)}>
      <FormControl id="username" mb={1}>
        <Input
          focusBorderColor="red.500"
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
          isRequired
        />
      </FormControl>
      <FormControl id="email" mb={1}>
        <Input
          focusBorderColor="red.500"
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          isRequired
        />
      </FormControl>
      <FormControl id="password" mb={1}>
        <Input
          focusBorderColor="red.500"
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          isRequired
        />
      </FormControl>
      <FormControl id="password-confirmation" mb={1}>
        <Input
          focusBorderColor="red.500"
          type="password"
          placeholder="Confirm your Password"
          {...register('passwordConfirmation', { required: true })}
          isRequired
        />
      </FormControl>
      <Button
        colorScheme="red"
        w="100%"
        type="submit"
        isDisabled={isRegistering}
      >
        Register
      </Button>
    </form>
  );
};

export default AuthRegisterForm;
