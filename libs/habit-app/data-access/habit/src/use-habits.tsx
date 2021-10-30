import { gql, useQuery } from '@apollo/client';

export const GET_HABITS = gql`
  query UseHabitsQuery {
    getUser(id: "alice@anlitz.com") {
      habits {
        id
        name
      }
    }
  }
`;

export const useHabits = () => {
  const { loading, error, data: gqlData } = useQuery(GET_HABITS);
  const data = gqlData?.getUser?.habits || [];

  return { loading, error, data };
};
