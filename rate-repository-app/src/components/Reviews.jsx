import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { Alert, FlatList } from 'react-native';

import { DELETE_REVIEW } from '../graphql/mutations';
import RepositoryReviewItem from './RepositoryList/RepositoryReviewItem';
import ItemSeparator from './RepositoryList/ItemSeparator';
import useMe from '../hooks/useMe';
import Loader from './Loader';

const Reviews = () => {
  const [{ data: meData, loading, error, refetch, fetchMore }] = useMe({
    variables: { withReviews: true, first: 5 },
  });

  const reviews = meData
    ? meData.me.reviews.edges.map((edge) => edge.node)
    : [];

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const confirmDeletingReview = (review) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            deleteReview({
              variables: { id: review.id },
              onError: (error) => {
                Alert.alert('Delete Failed!', error.message);
              },
              onCompleted: () => {
                refetch();
                Alert.alert('Deleted!', 'The review is successfully deleted.');
              },
            }),
        },
      ],
      { cancelable: true },
    );
  };

  const navigate = useNavigate();

  const reviewRepository = (review) => {
    navigate(`/${review.repositoryId}`);
  };

  return (
    <Loader loading={!meData && loading} error={meData ? null : error}>
      <FlatList
        data={reviews}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item: review, ...props }) => (
          <RepositoryReviewItem
            {...props}
            item={review}
            onReviewRepository={() => reviewRepository(review)}
            onDeleteReview={() => confirmDeletingReview(review)}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Loader>
  );
};

export default Reviews;
