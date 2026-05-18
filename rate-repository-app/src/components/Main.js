import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});

function Main() {
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
      <StatusBar style='auto' />
    </View>
  );
}

export default Main;
