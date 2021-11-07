import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuthentication } from '../use-authentication';

const Component = () => {
  const { login } = useAuthentication();

  return (
    <SafeAreaView testID="LoginScreen" style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <View style={{ padding: 24 }}>
        <Button mode="contained" onPress={login} testID="LoginButton">
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: false,
  title: '',
};

export const LoginScreen = { Component, options };
