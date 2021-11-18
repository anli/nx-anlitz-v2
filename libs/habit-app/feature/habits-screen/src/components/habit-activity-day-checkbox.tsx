import { Text, View } from '@nx-anlitz/shared/ui';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';

export const HabitActivityDayCheckbox = ({
  title,
  count = 0,
  onPress,
  testID,
}: {
  title: string;
  count?: number;
  onPress: (count: number) => Promise<unknown>;
  testID?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePress = async () => {
    setLoading(true);
    await onPress(count ? 0 : 1);
    setLoading(false);
  };

  return (
    <View>
      <Text textAlign="center">{title}</Text>
      <Checkbox.Android
        testID={testID}
        status={count ? 'checked' : 'unchecked'}
        onPress={handlePress}
        disabled={loading}
      />
    </View>
  );
};
