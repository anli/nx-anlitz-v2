import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HabitsScreen } from '@nx-anlitz/habit-app/feature/habits-screen';
import React from 'react';

const Stack = createNativeStackNavigator();

export const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HabitsScreen"
        component={HabitsScreen.Component}
        options={HabitsScreen.options}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
