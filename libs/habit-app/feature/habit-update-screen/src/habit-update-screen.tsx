import {
  useHabitNonSubscription,
  useHabitUpdate,
} from '@nx-anlitz/habit-app/data-access/habit';
import { RootStackParamList } from '@nx-anlitz/habit-app/utils/navigation-types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, TextInput } from 'react-native';
import { FAB, HelperText } from 'react-native-paper';

type FormData = {
  name: string;
};

type ScreenRouteProp = RouteProp<RootStackParamList, 'HabitUpdateScreen'>;

const Component = () => {
  const { canGoBack, goBack } = useNavigation();
  const {
    params: { id },
  } = useRoute<ScreenRouteProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { data: defaultValues } = useHabitNonSubscription({ id });
  const { mutate } = useHabitUpdate();

  useEffect(() => {
    if (defaultValues) {
      reset({ name: defaultValues?.name });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: FormData) => {
    await mutate({ id, set: data });
    canGoBack() && goBack();
  };

  return (
    <SafeAreaView testID="HabitUpdateScreen" style={{ flex: 1 }}>
      <Controller
        control={control}
        rules={{
          required: 'Habit Name is required.',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID="NameInput"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter habit"
          />
        )}
        name="name"
        defaultValue=""
      />
      <HelperText type="error" visible={Boolean(errors.name)}>
        {errors.name?.message}
      </HelperText>
      <FAB
        testID="UpdateHabitButton"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={handleSubmit(onSubmit)}
        icon="check"
      />
    </SafeAreaView>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  title: '',
};

export const HabitUpdateScreen = { Component, options };
