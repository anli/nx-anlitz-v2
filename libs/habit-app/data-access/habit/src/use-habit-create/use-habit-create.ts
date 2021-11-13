import {
  AddHabitInput,
  UserRef,
} from '@nx-anlitz/habit-app/utils/graphql-types';
import { useHabitCreateMutation } from './use-habit-create.generated';

export const useHabitCreate = () => {
  const [habitCreate, { data: gqlData, loading, error }] =
    useHabitCreateMutation();
  const data = gqlData?.addHabit?.numUids;

  const handleMutate = ({
    name,
    email,
  }: Pick<AddHabitInput, 'name'> & Pick<UserRef, 'email'>) => {
    habitCreate({
      variables: {
        input: {
          name,
          user: { email },
        },
      },
    });
  };

  return { loading, error, data, mutate: handleMutate };
};
