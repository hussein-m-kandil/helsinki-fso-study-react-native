import { useApolloClient, useMutation } from '@apollo/client/react';

import { AUTHENTICATE } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const apolloClient = useApolloClient();

  const authStorage = useAuthStorage();

  const navigate = useNavigate();

  const signIn = async (credentials) => {
    const mutationResult = await mutate({ variables: { credentials } });
    await authStorage.setAccessToken(
      mutationResult.data.authenticate.accessToken,
    );
    await apolloClient.resetStore();
    navigate('/');
    return mutationResult;
  };

  return [signIn, result];
};

export default useSignIn;
