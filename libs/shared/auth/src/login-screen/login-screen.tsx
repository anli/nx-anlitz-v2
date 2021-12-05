import { lottieRocketLaunch } from '@nx-anlitz/shared/assets';
import { Button, Screen, Text, View } from '@nx-anlitz/shared/ui';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import faker from 'faker';
import LottieView from 'lottie-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../use-auth';

faker.seed(0);
const title = faker.lorem.sentences(1);
const description = faker.lorem.sentences(4);

const Component = () => {
  const { login } = useAuth();
  const { t, ready } = useTranslation('loginScreen', {
    useSuspense: false,
  });

  return (
    <Screen testID="LoginScreen">
      <View flex={1}>
        <LottieView source={lottieRocketLaunch} autoPlay loop />
      </View>
      <View>
        <Text fontSize={42} padding="base">
          {ready && t('title')}
        </Text>
        <Text padding="base">{ready && t('description')}</Text>
      </View>
      <View padding="base">
        <Button
          padding="tight"
          borderRadius="loose"
          mode="contained"
          onPress={login}
          testID="LoginButton"
        >
          {ready && t('login')}
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
