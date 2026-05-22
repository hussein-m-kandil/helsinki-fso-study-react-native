import { View, Pressable, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  header: {
    padding: 20,
    gap: 10,
  },
});

const RepositoryListContainer = ({
  repositories,
  sortOptions,
  selectedSortOption,
  searchKeyword,
  onEndReached,
  onSearch,
  onSort,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, ...props }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} {...props} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Searchbar
            placeholder='Search'
            value={searchKeyword}
            onChangeText={onSearch}
            onClearIconPress={() => onSearch(undefined)}
            autoFocus={typeof searchKeyword === 'string'}
          />
          <Picker
            selectedValue={selectedSortOption}
            onValueChange={(itemValue) => onSort(itemValue)}
          >
            {sortOptions.map((option, i) => (
              <Picker.Item key={option.label} label={option.label} value={i} />
            ))}
          </Picker>
        </View>
      )}
    />
  );
};

export default RepositoryListContainer;
