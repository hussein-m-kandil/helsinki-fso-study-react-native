import { Routes, Route, Navigate } from 'react-router-native';
import { View, StyleSheet } from 'react-native';

import Repository from './RepositoryList/Repository';
import RepositoryList from './RepositoryList';
import CreateReview from './CreateReview';
import Reviews from './Reviews';
import SignIn from './SignIn';
import SignUp from './Signup';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/review' element={<CreateReview />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:id' element={<Repository />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
