import {
  useHabit,
  useHabitDelete,
} from '@nx-anlitz/habit-app/data-access/habit';
import { RootStackParamList } from '@nx-anlitz/habit-app/utils/navigation-types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { IconButton, List } from 'react-native-paper';

type ScreenRouteProp = RouteProp<RootStackParamList, 'HabitViewScreen'>;

const Component = () => {
  const { goBack, canGoBack, setOptions } = useNavigation();
  const {
    params: { id },
  } = useRoute<ScreenRouteProp>();
  const { data } = useHabit({ id });
  const { mutate } = useHabitDelete();

  useLayoutEffect(() => {
    const handleDelete = async () => {
      await mutate({ id });
      canGoBack() && goBack();
    };

    setOptions({
      headerRight: () => (
        <IconButton
          testID="HabitDeleteButton"
          icon="delete"
          size={24}
          onPress={handleDelete}
        />
      ),
    });
  }, [setOptions, canGoBack, goBack, id, mutate]);

  return (
    <SafeAreaView testID="HabitViewScreen" style={{ flex: 1 }}>
      <List.Item title={data?.name} />
    </SafeAreaView>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  title: '',
};

export const HabitViewScreen = { Component, options };
