import { eachDayOfInterval, format, formatISO, startOfToday } from 'date-fns';
import React from 'react';
import { Text, View } from '..';

export const WeekHeader = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const data = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <View backgroundColor="surface" paddingHorizontal="base">
      <View
        paddingVertical="tight"
        flexDirection="row"
        justifyContent="space-around"
        marginHorizontal="tight"
      >
        {data.map((day) => {
          const variant =
            formatISO(day) === formatISO(startOfToday())
              ? 'footnoteEmphasized'
              : 'footnote';

          const dayName = format(day, 'd');

          return (
            <View key={dayName}>
              <Text variant={variant}>{dayName}</Text>
              <Text variant={variant}>{format(day, 'EEEEEE')}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
