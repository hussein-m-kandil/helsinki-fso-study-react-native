import { FlatList, View, StyleSheet } from 'react-native';

import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  message: {
    color: theme.colors.accent,
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) {
    return <Text style={styles.message}>Loading...</Text>;
  }

  if (error) {
    return (
      <Text style={[styles.message, { color: theme.colors.danger }]}>
        {error.message}
      </Text>
    );
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={RepositoryItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
