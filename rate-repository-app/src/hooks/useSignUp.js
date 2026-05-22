import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from './useSignIn';
import { useNavigate } from 'react-router-native';

const useSignUp = () => {
  const [mutation, result] = useMutation(CREATE_USER);

  const [signIn] = useSignIn();

  const navigate = useNavigate();

  const signUp = async (user) => {
    const { data } = await mutation({ variables: { user } });
    if (data) {
      const { error } = await signIn(user);
      if (error) {
        navigate('/signin');
      }
    }
  };

  return [signUp, result];
};

export default useSignUp;
