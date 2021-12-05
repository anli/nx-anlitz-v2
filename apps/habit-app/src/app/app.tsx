import { HabitCreateScreen } from '@nx-anlitz/habit-app/feature/habit-create-screen';
import { HabitUpdateScreen } from '@nx-anlitz/habit-app/feature/habit-update-screen';
import { HabitViewScreen } from '@nx-anlitz/habit-app/feature/habit-view-screen';
import { HabitsScreen } from '@nx-anlitz/habit-app/feature/habits-screen';
import { AuthProvider, LoginScreen, useAuth } from '@nx-anlitz/shared/auth';
import { baseTheme, darkTheme, useDarkMode } from '@nx-anlitz/shared/ui';
import { CustomApolloProvider } from '@nx-anlitz/shared/utils/apollo-provider';
import { init as i18nInit } from '@nx-anlitz/shared/utils/i18n';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  AUTHENTICATION_CLIENT_ID,
  AUTHENTICATION_DOMAIN,
  GRAPHQL_URL,
  I18N_URL,
} from 'react-native-dotenv';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

i18nInit(I18N_URL);

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
  const { isAuthenticated, idToken, loading } = useAuth();
  const isDarkMode = useDarkMode();

  /* istanbul ignore next */
  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return (
    <CustomApolloProvider url={GRAPHQL_URL} authToken={idToken}>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen
              name="AuthenticatedNavigator"
              component={AuthenticatedNavigator}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="PublicNavigator"
              component={PublicNavigator}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CustomApolloProvider>
  );
};

export const App = () => {
  const isDarkMode = useDarkMode();

  return (
    <AuthProvider
      clientId={AUTHENTICATION_CLIENT_ID}
      domain={AUTHENTICATION_DOMAIN}
    >
      <ThemeProvider theme={isDarkMode ? darkTheme : baseTheme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
