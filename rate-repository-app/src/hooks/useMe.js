import { useApolloClient, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import { ME } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useMe = () => {
  const { data } = useQuery(ME);

  const authStorage = useAuthStorage();

  const apolloClient = useApolloClient();

  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('');
  };

  return [data?.me, signOut];
};

export default useMe;
