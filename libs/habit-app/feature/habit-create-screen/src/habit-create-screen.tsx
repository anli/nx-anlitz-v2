import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, TextInput } from 'react-native';
import { FAB, HelperText } from 'react-native-paper';

type FormData = {
  name: string;
};

const Component = () => {
  const { canGoBack, goBack } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    canGoBack() && goBack();
  };

  return (
    <SafeAreaView testID="HabitCreateScreen" style={{ flex: 1 }}>
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
        testID="CreateHabitButton"
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

export const HabitCreateScreen = { Component, options };
