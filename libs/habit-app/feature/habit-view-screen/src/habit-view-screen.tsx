import {
  useHabit,
  useHabitDelete,
} from '@nx-anlitz/habit-app/data-access/habit';
import { RootStackParamList } from '@nx-anlitz/habit-app/utils/navigation-types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { IconButton, List } from 'react-native-paper';

type ScreenRouteProp = RouteProp<RootStackParamList, 'HabitViewScreen'>;

const Component = () => {
  const { goBack, canGoBack, setOptions, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

    const handleUpdate = async () => {
      data && navigate('HabitUpdateScreen', { id });
    };

    setOptions({
      headerRight: () => (
        <>
          <IconButton
            testID="HabitUpdateButton"
            icon="pencil"
            size={24}
            onPress={handleUpdate}
          />
          <IconButton
            testID="HabitDeleteButton"
            icon="delete"
            size={24}
            onPress={handleDelete}
          />
        </>
      ),
    });
  }, [setOptions, canGoBack, goBack, id, mutate, data, navigate]);

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
