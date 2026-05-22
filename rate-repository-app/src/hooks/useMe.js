import { useApolloClient, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import { ME } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useMe = ({ variables } = {}) => {
  const { data, loading, fetchMore, ...result } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const authStorage = useAuthStorage();

  const apolloClient = useApolloClient();

  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    navigate('/');
    await apolloClient.resetStore();
  };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return [{ data, loading, fetchMore: handleFetchMore, ...result }, signOut];
};

export default useMe;
