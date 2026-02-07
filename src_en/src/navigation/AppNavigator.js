import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesListScreen from '../screens/NotesListScreen';
import EditorScreen from '../screens/EditorScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="NotesList"
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
        name="NotesList"
        component={NotesListScreen}
        options={{
          title: 'My Notes',
        }}
      />
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={{
          title: 'Edit Note',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
