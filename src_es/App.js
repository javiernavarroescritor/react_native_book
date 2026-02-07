import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NotesProvider } from './src/context/NotesContext';
import AppNavigator from './src/navigation/AppNavigator';
import theme from './src/config/theme';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NotesProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
          <AppNavigator />
        </NavigationContainer>
      </NotesProvider>
    </PaperProvider>
  );
};

export default App;
