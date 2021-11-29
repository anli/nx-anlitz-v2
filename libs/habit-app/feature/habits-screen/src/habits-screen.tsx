import {
  useHabitActivityCreate,
  useHabitActivityUpdate,
  useHabits,
} from '@nx-anlitz/habit-app/data-access/habit';
import { RootStackParamList } from '@nx-anlitz/habit-app/utils/navigation-types';
import { useAuth } from '@nx-anlitz/shared/auth';
import { FAB, IconButton, Screen, Text, View } from '@nx-anlitz/shared/ui';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  formatISO,
  startOfToday,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { HabitActivityDayCheckbox } from './components';
import { filterNullable, formatDateRange } from './utils';

const Component = () => {
  const { navigate, setOptions } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout } = useAuth();
  const { mutate: updateHabitActivity } = useHabitActivityUpdate();
  const { mutate: createHabitActivity } = useHabitActivityCreate();
  const [periodStartDate, setPeriodStartDate] = useState<Date>(
    startOfWeek(startOfToday(), { weekStartsOn: 1 })
  );
  const periodEndDate = endOfWeek(periodStartDate, { weekStartsOn: 1 });
  const { loading, data } = useHabits({
    minDate: formatISO(periodStartDate),
    maxDate: formatISO(periodEndDate),
  });

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <Text>{formatDateRange(periodStartDate, periodEndDate)}</Text>
      ),
      headerRight: () => (
        <>
          <IconButton
            testID="PreviousPeriodButton"
            icon="menu-left"
            size={24}
            onPress={() => setPeriodStartDate(subWeeks(periodStartDate, 1))}
          />
          <IconButton
            testID="NextPeriodButton"
            icon="menu-right"
            size={24}
            onPress={() => setPeriodStartDate(addWeeks(periodStartDate, 1))}
          />
          <IconButton
            testID="TodayButton"
            icon="calendar"
            size={24}
            onPress={() =>
              setPeriodStartDate(
                startOfWeek(startOfToday(), { weekStartsOn: 1 })
              )
            }
          />
          <IconButton
            testID="LogoutButton"
            icon="logout"
            size={24}
            onPress={logout}
          />
        </>
      ),
    });
  }, [setOptions, logout, periodStartDate, periodEndDate]);

  const handleCreateHabit = () => {
    navigate('HabitCreateScreen');
  };

  const handleViewHabit = (id: string) => {
    navigate('HabitViewScreen', { id });
  };

  const handleUpdateHabitActivity = useCallback(
    async ({
      date,
      habitId,
      count,
      habitActivityId,
    }: {
      date: string;
      habitId: string;
      count: number;
      habitActivityId?: string;
    }) => {
      if (habitActivityId) {
        return updateHabitActivity({
          id: habitActivityId,
          set: { count, date, habit: { id: habitId } },
        });
      }

      return createHabitActivity({
        count,
        date,
        habit: { id: habitId },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const mapData = ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) =>
    filterNullable(data).map((dataItem) => {
      return {
        id: dataItem.id,
        name: dataItem.name,
        data: eachDayOfInterval({
          start: startDate,
          end: endDate,
        }).map((day) => {
          const myActivity = dataItem?.habitActivities?.find((activity) => {
            return activity.date.substring(0, 10) === format(day, 'yyyy-MM-dd');
          });

          return {
            date: day,
            count: myActivity?.count ?? 0,
            id: myActivity?.id,
          };
        }),
      };
    });

  const mappedData = mapData({
    startDate: periodStartDate,
    endDate: periodEndDate,
  });

  return (
    <Screen testID="HabitsScreen">
      {!loading && (
        <FlatList
          data={mappedData}
          renderItem={({ item: { id, name, data: _data } }) => {
            return (
              <>
                <View padding="base">
                  <TouchableOpacity
                    key={`${id}`}
                    onPress={() => handleViewHabit(id)}
                  >
                    <Text>{name}</Text>
                  </TouchableOpacity>
                </View>
                <View flexDirection="row" justifyContent="space-evenly">
                  {_data.map((dailyActivity) => (
                    <HabitActivityDayCheckbox
                      testID="HabitActivityDayCheckbox"
                      key={format(dailyActivity.date, 'yyyy-MM-dd')}
                      title={format(dailyActivity.date, 'EEEEEE')}
                      date={formatISO(dailyActivity.date)}
                      count={dailyActivity?.count}
                      habitId={id}
                      habitActivityId={dailyActivity?.id}
                      onPress={handleUpdateHabitActivity}
                    />
                  ))}
                </View>
              </>
            );
          }}
          keyExtractor={({ id }) => `${id}`}
          ListEmptyComponent={
            <Text>You have no habits. Press + to create one</Text>
          }
        />
      )}
      <View position="absolute" margin="base" right={0} bottom={0}>
        <FAB
          testID="CreateHabitButton"
          onPress={handleCreateHabit}
          icon="plus"
        />
      </View>
    </Screen>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  title: '',
};

export const HabitsScreen = { Component, options };
