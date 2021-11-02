import { useHabits } from '@nx-anlitz/habit-app/data-access/habit';
import { RootStackParamList } from '@nx-anlitz/habit-app/utils/navigation-types';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { FAB, List } from 'react-native-paper';

const Component = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data } = useHabits();

  const handleCreateHabit = () => {
    navigate('HabitCreateScreen');
  };

  const handleViewHabit = (id: string) => {
    navigate('HabitViewScreen', { id });
  };

  return (
    <SafeAreaView testID="HabitsScreen" style={{ flex: 1 }}>
      {data && (
        <FlatList
          data={data}
          renderItem={({ item: { id, name } }) => (
            <List.Item
              key={`${id}`}
              title={name}
              onPress={() => handleViewHabit(id)}
            />
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
