import { Button, Screen, View } from '@nx-anlitz/shared/ui';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../use-auth';

const Component = () => {
  const { login } = useAuth();

  return (
    <Screen testID="LoginScreen">
      <View flex={1} />
      <View padding="base">
        <Button mode="contained" onPress={login} testID="LoginButton">
          Login
        </Button>
      </View>
    </Screen>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: false,
  title: '',
};

export const LoginScreen = { Component, options };
