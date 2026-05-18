import { View, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const formatCount = (count) => {
  const K = 1000;
  const M = K * K;
  const B = M * K;
  switch (true) {
    case count < K:
      return `${count}`;
    case count >= K:
      return `${(count / K).toFixed(1)}K`;
    case count >= M:
      return `${(count / M).toFixed(1)}M`;
    default:
      return `${(count / B).toFixed(1)}B`;
  }
};

const styles = StyleSheet.create({
  count: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
    color: theme.colors.accent,
  },
  label: {
    fontSize: 20,
    fontWeight: 400,
    color: theme.colors.secondary,
  },
});

const Count = ({ count, label }) => {
  return (
    <View>
      <Text style={styles.count}>{formatCount(count)}</Text>
      <Text style={[styles.count, styles.label]}>{label}</Text>
    </View>
  );
};

export default Count;
