import { HabitCreateScreen } from '@nx-anlitz/habit-app/feature/habit-create-screen';
import { HabitUpdateScreen } from '@nx-anlitz/habit-app/feature/habit-update-screen';
import { HabitViewScreen } from '@nx-anlitz/habit-app/feature/habit-view-screen';
import { HabitsScreen } from '@nx-anlitz/habit-app/feature/habits-screen';
import { LoginScreen } from '@nx-anlitz/shared/feature/authentication';
import { CustomApolloProvider } from '@nx-anlitz/shared/utils/apollo-provider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Config from 'react-native-config';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const PublicNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen.Component}
        options={LoginScreen.options}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedNavigator = () => {
  return (
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
      <Stack.Screen
        name="HabitUpdateScreen"
        component={HabitUpdateScreen.Component}
        options={HabitUpdateScreen.options}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  // const { isAuthenticated } = useAuthentication();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {isAuthenticated ? ( */}
        <Stack.Screen
          name="AuthenticatedNavigator"
          component={AuthenticatedNavigator}
          options={{
            headerShown: false,
          }}
        />
        {/* ) : (
          <Stack.Screen
            name="PublicNavigator"
            component={PublicNavigator}
            options={{ headerShown: false }}
          />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const App = () => (
  // <AuthenticationProvider
  //   clientId={Config.AUTHENTICATION_CLIENT_ID}
  //   domain={Config.AUTHENTICATION_DOMAIN}
  // >
  <CustomApolloProvider url={Config.GRAPHQL_URL}>
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  </CustomApolloProvider>
  // </AuthenticationProvider>
);
