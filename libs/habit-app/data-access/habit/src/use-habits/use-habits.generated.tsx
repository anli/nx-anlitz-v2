import * as Types from '@nx-anlitz/habit-app/utils/graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type HabitsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HabitsQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', habits?: Array<{ __typename?: 'Habit', id: string, name: string } | null | undefined> | null | undefined } | null | undefined };


export const HabitsDocument = gql`
    query Habits {
  getUser(id: "alice@anlitz.com") {
    habits {
      id
      name
    }
  }
}
    `;

/**
 * __useHabitsQuery__
 *
 * To run a query within a React component, call `useHabitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHabitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHabitsQuery(baseOptions?: Apollo.QueryHookOptions<HabitsQuery, HabitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HabitsQuery, HabitsQueryVariables>(HabitsDocument, options);
      }
export function useHabitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HabitsQuery, HabitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HabitsQuery, HabitsQueryVariables>(HabitsDocument, options);
        }
export type HabitsQueryHookResult = ReturnType<typeof useHabitsQuery>;
export type HabitsLazyQueryHookResult = ReturnType<typeof useHabitsLazyQuery>;
export type HabitsQueryResult = Apollo.QueryResult<HabitsQuery, HabitsQueryVariables>;