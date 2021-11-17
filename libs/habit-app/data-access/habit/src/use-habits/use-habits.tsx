import {
  HabitsSubscriptionVariables,
  useHabitsSubscription,
} from './use-habits.generated';

export const useHabits = ({
  minDate,
  maxDate,
}: HabitsSubscriptionVariables) => {
  const {
    loading,
    error,
    data: gqlData,
  } = useHabitsSubscription({ variables: { minDate, maxDate } });
  const data = gqlData?.queryHabit || [];

  return { loading, error, data };
};
