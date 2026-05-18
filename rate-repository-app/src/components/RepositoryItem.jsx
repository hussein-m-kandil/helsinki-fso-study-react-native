import { View, Image, StyleSheet } from 'react-native';

import theme from '../theme';
import Count from './Count';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrast,
    padding: 20,
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  subheaderContainer: {
    flexShrink: 1,
    gap: 5,
  },
  langContainer: {
    alignSelf: 'flex-start',
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 600,
    color: theme.colors.accent,
  },
  lang: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.contrast,
    borderRadius: 6,
    paddingInline: 6,
    paddingBlock: 3,
    fontWeight: 600,
  },
  desc: {
    fontSize: 20,
    color: theme.colors.secondary,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.subheaderContainer}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <View style={styles.langContainer}>
            <Text style={styles.lang}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <Count count={item.stargazersCount} label={'Stars'} />
        <Count count={item.forksCount} label={'Forks'} />
        <Count count={item.reviewCount} label={'Reviews'} />
        <Count count={item.ratingAverage} label={'Rating'} />
      </View>
    </View>
  );
};

export default RepositoryItem;
