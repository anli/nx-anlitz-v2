import {
  useHabitActivityCreate,
  useHabitActivityUpdate,
  useHabits,
} from '@nx-anlitz/habit-app/data-access/habit';
import { RootStackParamList } from '@nx-anlitz/habit-app/utils/navigation-types';
import { useAuth } from '@nx-anlitz/shared/auth';
import { Text, View } from '@nx-anlitz/shared/ui';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  addWeeks,
  endOfWeek,
  formatISO,
  isSameDay,
  startOfToday,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import { toDate } from 'date-fns-tz';
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { FAB, IconButton, List } from 'react-native-paper';
import { HabitActivityDayCheckbox } from './components';
import { filterNullable, formatDateRange, getDays } from './utils';

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
  const days = getDays(periodStartDate);

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

  const handleUpdateHabitActivity = async ({
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
  };

  return (
    <SafeAreaView testID="HabitsScreen" style={{ flex: 1 }}>
      {!loading && (
        <FlatList
          data={filterNullable(data)}
          renderItem={({ item: { id, name, habitActivities } }) => {
            return (
              <>
                <List.Item
                  key={`${id}`}
                  title={name}
                  onPress={() => handleViewHabit(id)}
                />
                <View flexDirection="row" justifyContent="space-evenly">
                  {days.map(({ date: dayDate, dayName }) => {
                    const habitActivity = habitActivities?.find(
                      ({ date: habitActivityDate }) =>
                        isSameDay(toDate(habitActivityDate), dayDate)
                    );

                    return (
                      <HabitActivityDayCheckbox
                        testID="HabitActivityDayCheckbox"
                        key={dayName}
                        title={dayName}
                        count={habitActivity?.count}
                        onPress={(count) =>
                          handleUpdateHabitActivity({
                            date: formatISO(dayDate),
                            habitId: id,
                            count,
                            habitActivityId: habitActivity?.id,
                          })
                        }
                      />
                    );
                  })}
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
    </SafeAreaView>
  );
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  title: '',
};

export const HabitsScreen = { Component, options };
