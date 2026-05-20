import { ApolloProvider } from '@apollo/client/react';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';

import AuthStorageContext from './src/contexts/AuthStorageContext';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import Main from './src/components/Main';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext value={authStorage}>
            <Main />
          </AuthStorageContext>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
}
