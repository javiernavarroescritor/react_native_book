import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesListScreen from '../screens/NotesListScreen';
import EditorScreen from '../screens/EditorScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListaNotas"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498DB',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="ListaNotas"
        component={NotesListScreen}
        options={{
          title: 'Mis Notas',
        }}
      />
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={{
          title: 'Editar Nota',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
