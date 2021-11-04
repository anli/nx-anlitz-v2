import * as Types from '@nx-anlitz/habit-app/utils/graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type HabitNonSubscriptionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type HabitNonSubscriptionQuery = { __typename?: 'Query', getHabit?: { __typename?: 'Habit', name: string, id: string } | null | undefined };


export const HabitNonSubscriptionDocument = gql`
    query HabitNonSubscription($id: ID!) {
  getHabit(id: $id) {
    name
    id
  }
}
    `;

/**
 * __useHabitNonSubscriptionQuery__
 *
 * To run a query within a React component, call `useHabitNonSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useHabitNonSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitNonSubscriptionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHabitNonSubscriptionQuery(baseOptions: Apollo.QueryHookOptions<HabitNonSubscriptionQuery, HabitNonSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HabitNonSubscriptionQuery, HabitNonSubscriptionQueryVariables>(HabitNonSubscriptionDocument, options);
      }
export function useHabitNonSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HabitNonSubscriptionQuery, HabitNonSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HabitNonSubscriptionQuery, HabitNonSubscriptionQueryVariables>(HabitNonSubscriptionDocument, options);
        }
export type HabitNonSubscriptionQueryHookResult = ReturnType<typeof useHabitNonSubscriptionQuery>;
export type HabitNonSubscriptionLazyQueryHookResult = ReturnType<typeof useHabitNonSubscriptionLazyQuery>;
export type HabitNonSubscriptionQueryResult = Apollo.QueryResult<HabitNonSubscriptionQuery, HabitNonSubscriptionQueryVariables>;