import { Text, View } from '@nx-anlitz/shared/ui';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'react-native-paper';

type Props = {
  title: string;
  date: string;
  count: number;
  habitId: string;
  habitActivityId?: string;
  onPress: ({
    count,
    date,
    habitId,
    habitActivityId,
  }: {
    count: number;
    date: string;
    habitId: string;
    habitActivityId?: string;
  }) => Promise<unknown>;
  testID?: string;
};

export const HabitActivityDayCheckbox = React.memo(
  ({
    title,
    date,
    count,
    onPress,
    testID,
    habitId,
    habitActivityId,
  }: Props) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
      if (Boolean(count) !== isChecked) {
        setIsChecked(!!count);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handlePress = async () => {
      setIsChecked(!isChecked);
      onPress({
        count: isChecked ? 0 : 1,
        date,
        habitId,
        habitActivityId,
      });
    };

    return (
      <View>
        <Text textAlign="center">{title}</Text>
        <Checkbox.Android
          testID={testID}
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={handlePress}
        />
      </View>
    );
  }
);
