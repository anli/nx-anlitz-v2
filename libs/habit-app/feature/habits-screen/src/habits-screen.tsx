import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FAB } from 'react-native-paper';

const Component = () => {
  const { navigate } = useNavigation<
    NativeStackNavigationProp<
      {
        HabitCreateScreen: undefined;
      },
      'HabitCreateScreen'
    >
  >();

  const onCreateHabit = () => {
    navigate('HabitCreateScreen');
  };

  return (
    <SafeAreaView testID="HabitsScreen" style={{ flex: 1 }}>
      <Text>You have no habits. Press + to create one</Text>
      <FAB
        testID="CreateHabitButton"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={onCreateHabit}
        icon="plus"
      />
    </SafeAreaView>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  title: 'Habits',
};

export const HabitsScreen = { Component, options };
