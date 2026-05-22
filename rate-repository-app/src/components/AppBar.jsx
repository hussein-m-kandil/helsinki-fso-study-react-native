import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import useMe from '../hooks/useMe';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    flexShrink: 0,
    flexGrow: 0,
    gap: 10,
  },
  link: {
    borderRadius: 10,
    paddingInline: 20,
    paddingBlock: 16,
  },
  linkText: {
    fontSize: 20,
    color: theme.colors.contrast,
  },
});

const AppBar = () => {
  const [{ data }, signOut] = useMe();

  const me = data ? data.me : null;

  return (
    <ScrollView horizontal key={JSON.stringify(me)} style={styles.container}>
      <Link style={styles.link} to='/'>
        <Text style={styles.linkText}>Repositories</Text>
      </Link>
      {me ? (
        <>
          <Link style={styles.link} to={'/review'}>
            <Text style={styles.linkText}>Create a review</Text>
          </Link>
          <Link style={styles.link} to={'/reviews'}>
            <Text style={styles.linkText}>My reviews</Text>
          </Link>
          <Link style={styles.link} onPress={signOut}>
            <Text style={styles.linkText}>Sign out</Text>
          </Link>
        </>
      ) : (
        <>
          <Link style={styles.link} to='/signin'>
            <Text style={styles.linkText}>Sing in</Text>
          </Link>
          <Link style={styles.link} to='/signup'>
            <Text style={styles.linkText}>Sing up</Text>
          </Link>
        </>
      )}
    </ScrollView>
  );
};

export default AppBar;
