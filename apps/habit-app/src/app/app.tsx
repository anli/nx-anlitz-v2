import { HabitsScreen } from '@nx-anlitz/habit-app/feature/habits-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HabitsScreen"
          component={HabitsScreen.Component}
          options={HabitsScreen.options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);
