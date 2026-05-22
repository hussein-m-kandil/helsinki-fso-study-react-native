import { useParams } from 'react-router-native';
import { FlatList } from 'react-native';

import RepositoryReviewItem from './RepositoryReviewItem';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import Loader from '../Loader';

const Repository = () => {
  const { id } = useParams();

  const { repository, loading, error, fetchMore } = useRepository({
    variables: { id, first: 3 },
  });

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <Loader loading={!repository && loading} error={repository ? null : error}>
      <FlatList
        data={reviews}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        renderItem={RepositoryReviewItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <>
            <RepositoryItem item={repository} detailed />
            <ItemSeparator />
          </>
        )}
      />
    </Loader>
  );
};

export default Repository;
