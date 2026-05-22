import SignInContainer from './SignInContainer';
import useSignIn from '../../hooks/useSignIn';

const SignIn = () => {
  const [signIn, { error }] = useSignIn();

  const onSubmit = (values) => {
    signIn(values);
  };

  return <SignInContainer onSubmit={onSubmit} error={error} />;
};

export default SignIn;
