import { View, Pressable, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrast,
    flexDirection: 'row',
    gap: 20,
    padding: 20,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderRadius: 35,
    width: 70,
    height: 70,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 700,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: theme.colors.accent,
  },
  date: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: theme.colors.accent,
  },
  actions: {
    backgroundColor: theme.colors.contrast,
    marginTop: 1,
    padding: 20,
    flex: 1,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    flexGrow: 1,
  },
  actionText: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.contrast,
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    borderRadius: 10,
    padding: 15,
  },
});

const RepositoryReviewItem = ({
  item: review,
  onReviewRepository,
  onDeleteReview,
}) => {
  const mutable = onReviewRepository && onDeleteReview;

  return (
    <View key={review.id}>
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {mutable ? review.repository.fullName : review.user.username}
          </Text>
          <Text style={styles.date}>
            {format(review.createdAt, 'dd MMM y')}
          </Text>
          {review.text && <Text style={styles.text}>{review.text}</Text>}
        </View>
      </View>

      {mutable && (
        <View style={styles.actions}>
          <Pressable style={styles.actionButton} onPress={onReviewRepository}>
            <Text style={styles.actionText}>Review repository</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={onDeleteReview}>
            <Text
              style={[
                styles.actionText,
                { backgroundColor: theme.colors.danger },
              ]}
            >
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RepositoryReviewItem;
