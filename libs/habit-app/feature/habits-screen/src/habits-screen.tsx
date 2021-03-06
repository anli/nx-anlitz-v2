import {
  useHabitActivityCreate,
  useHabitActivityUpdate,
  useHabits,
} from '@nx-anlitz/habit-app/data-access/habit';
import { RootStackParamList } from '@nx-anlitz/habit-app/utils/navigation-types';
import { useAuth } from '@nx-anlitz/shared/auth';
import {
  Card,
  FAB,
  HorizontalBounceView,
  IconButton,
  Screen,
  Text,
  View,
} from '@nx-anlitz/shared/ui';
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
import { FlatList } from 'react-native';
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

  /* istanbul ignore next */
  const handlePreviousPeriod = () =>
    setPeriodStartDate(subWeeks(periodStartDate, 1));

  /* istanbul ignore next */
  const handleNextPeriod = () =>
    setPeriodStartDate(addWeeks(periodStartDate, 1));

  const headerData = eachDayOfInterval({
    start: periodStartDate,
    end: periodEndDate,
  });

  return (
    <Screen testID="HabitsScreen">
      <HorizontalBounceView
        onStart={handlePreviousPeriod}
        onEnd={handleNextPeriod}
      >
        {!loading && (
          <FlatList
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <View
                backgroundColor="surface"
                paddingVertical="tight"
                paddingHorizontal="base"
                flexDirection="row"
                justifyContent="space-around"
                marginHorizontal="tight"
              >
                {headerData.map((day) => {
                  const variant =
                    formatISO(day) === formatISO(startOfToday())
                      ? 'footnoteEmphasized'
                      : 'footnote';
                  return (
                    <View>
                      <Text variant={variant}>{format(day, 'd')}</Text>
                      <Text variant={variant}>{format(day, 'EEEEEE')}</Text>
                    </View>
                  );
                })}
              </View>
            }
            data={mappedData}
            renderItem={({ item: { id, name, data: _data } }) => {
              const checkboxes = _data.map((dailyActivity) => {
                return {
                  key: format(dailyActivity.date, 'yyyy-MM-dd'),
                  value: Boolean(dailyActivity?.count),
                  onPress: () =>
                    handleUpdateHabitActivity({
                      date: formatISO(dailyActivity.date),
                      count: dailyActivity?.count ? 0 : 1,
                      habitId: id,
                      habitActivityId: dailyActivity?.id,
                    }),
                };
              });

              return (
                <View paddingHorizontal="base" paddingVertical="tight">
                  <Card
                    onPress={() => handleViewHabit(id)}
                    title={name}
                    checkboxes={checkboxes}
                  />
                </View>
              );
            }}
            keyExtractor={({ id }) => `${id}`}
            ListEmptyComponent={
              <Text>You have no habits. Press + to create one</Text>
            }
          />
        )}
      </HorizontalBounceView>
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
