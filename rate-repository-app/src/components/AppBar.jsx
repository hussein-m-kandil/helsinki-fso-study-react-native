import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

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
  return (
    <ScrollView horizontal style={styles.container}>
      <Link to='/' style={styles.link}>
        <Text style={styles.linkText}>Repositories</Text>
      </Link>
      <Link to='/signin' style={styles.link}>
        <Text style={styles.linkText}>Sing in</Text>
      </Link>
    </ScrollView>
  );
};

export default AppBar;
