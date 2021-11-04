import { useHabitNonSubscriptionQuery } from './use-habit-non-subscription.generated';
import { useHabitSubscription } from './use-habit.generated';

export const useHabit = ({ id }: { id: string }) => {
  const {
    loading,
    error,
    data: gqlData,
  } = useHabitSubscription({ variables: { id } });
  const data = gqlData?.getHabit;

  return { loading, error, data };
};

export const useHabitNonSubscription = ({ id }: { id: string }) => {
  const {
    loading,
    error,
    data: gqlData,
  } = useHabitNonSubscriptionQuery({ variables: { id } });
  const data = gqlData?.getHabit;

  return { loading, error, data };
};
