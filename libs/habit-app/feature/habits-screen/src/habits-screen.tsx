import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { FAB, List } from 'react-native-paper';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useHabits } from '@nx-anlitz/habit-app/data-access/habit';

const Component = () => {
  const { navigate } = useNavigation<
    NativeStackNavigationProp<
      {
        HabitCreateScreen: undefined;
      },
      'HabitCreateScreen'
    >
  >();
  const { data } = useHabits();

  const handleCreateHabit = () => {
    navigate('HabitCreateScreen');
  };

  return (
    <SafeAreaView testID="HabitsScreen" style={{ flex: 1 }}>
      {data && (
        <FlatList
          data={data}
          renderItem={({ item: { id, name } }) => (
            <List.Item key={`${id}`} title={name} />
          )}
          keyExtractor={({ id }) => `${id}`}
          ListEmptyComponent={
            <Text>You have no habits. Press + to create one</Text>
          }
        />
      )}
      <FAB
        testID="CreateHabitButton"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={handleCreateHabit}
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
