import { StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  message: {
    color: theme.colors.accent,
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
  },
});

const Loader = ({ loading, error, children }) => {
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

  return children;
};

export default Loader;
