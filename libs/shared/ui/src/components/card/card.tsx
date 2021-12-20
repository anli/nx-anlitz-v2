import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Elevations from 'react-native-elevation';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { Text } from '../text';
import { View } from '../view';

type Props = {
  title: string;
  checkboxes: { key: string; value: boolean; onPress: () => void }[];
  onPress: () => void;
};

export const Card = ({ title, checkboxes, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        backgroundColor="surface"
        style={[Elevations[2]]}
        padding="tight"
        borderRadius="base"
        borderColor="border"
        borderWidth={StyleSheet.hairlineWidth}
      >
        <View flexDirection="row" justifyContent="space-around">
          {checkboxes.map(({ key, value, onPress: onCheckboxPress }) => (
            <Checkbox
              key={key}
              defaultStatus={value ? 'checked' : 'unchecked'}
              onPress={onCheckboxPress}
            />
          ))}
        </View>
        <Text margin="baseTight">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Checkbox = ({
  defaultStatus,
  onPress,
}: {
  defaultStatus: 'checked' | 'unchecked' | 'indeterminate';
  onPress: () => void;
}) => {
  const [status, setStatus] = useState<
    'checked' | 'unchecked' | 'indeterminate'
  >('unchecked');

  useEffect(() => {
    if (defaultStatus !== status) {
      setStatus(defaultStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultStatus]);

  const handlePress = () => {
    const newStatus = status === 'checked' ? 'unchecked' : 'checked';
    setStatus(newStatus);
    onPress();
  };

  return (
    <PaperCheckbox.Android
      testID="Checkbox"
      status={status}
      onPress={handlePress}
    />
  );
};
