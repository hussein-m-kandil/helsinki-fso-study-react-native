import { ApolloProvider } from '@apollo/client/react';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

import AuthStorageContext from './src/contexts/AuthStorageContext';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import Main from './src/components/Main';
import theme from './src/theme';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level3: theme.colors.contrast,
    },
  },
};

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext value={authStorage}>
            <PaperProvider theme={paperTheme}>
              <Main />
            </PaperProvider>
          </AuthStorageContext>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
}
