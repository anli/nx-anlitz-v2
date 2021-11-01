import { HabitCreateScreen } from '@nx-anlitz/habit-app/feature/habit-create-screen';
import { HabitViewScreen } from '@nx-anlitz/habit-app/feature/habit-view-screen';
import { HabitsScreen } from '@nx-anlitz/habit-app/feature/habits-screen';
import { CustomApolloProvider } from '@nx-anlitz/shared/utils/apollo-provider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GRAPHQL_URL } from 'react-native-dotenv';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export const App = () => (
  <CustomApolloProvider url={GRAPHQL_URL}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HabitsScreen"
            component={HabitsScreen.Component}
            options={HabitsScreen.options}
          />
          <Stack.Screen
            name="HabitCreateScreen"
            component={HabitCreateScreen.Component}
            options={HabitCreateScreen.options}
          />
          <Stack.Screen
            name="HabitViewScreen"
            component={HabitViewScreen.Component}
            options={HabitViewScreen.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  </CustomApolloProvider>
);
