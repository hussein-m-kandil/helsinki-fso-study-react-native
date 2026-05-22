import { View, StyleSheet } from 'react-native';

import theme from '../../theme';
import Text from '../Text';

export const formatCount = (count) => {
  const K = 1000;
  const M = K * K;
  const B = M * K;
  const round = (num) => num.toFixed(1).replace(/\.0$/, '');
  let result = round(count);
  if (result < K) return `${result}`;
  result = round(count / K);
  if (result < K) return `${result}K`;
  result = round(count / M);
  if (result < K) return `${result}M`;
  result = round(count / B);
  return `${result}B`;
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
