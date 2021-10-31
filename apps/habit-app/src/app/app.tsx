import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { HabitCreateScreen } from '@nx-anlitz/habit-app/feature/habit-create-screen';
import { HabitsScreen } from '@nx-anlitz/habit-app/feature/habits-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GRAPHQL_URL } from 'react-native-dotenv';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const App = () => (
  <ApolloProvider client={client}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  </ApolloProvider>
);
