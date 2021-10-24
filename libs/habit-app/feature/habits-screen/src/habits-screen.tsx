import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const Component = () => {
  return (
    <SafeAreaView testID="HabitsScreen">
      <Text>You have no habits. Press + to create one</Text>
    </SafeAreaView>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  title: 'Habits',
};

export const HabitsScreen = { Component, options };
