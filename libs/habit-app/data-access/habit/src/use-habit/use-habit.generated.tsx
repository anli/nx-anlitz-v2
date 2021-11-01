import * as Types from '@nx-anlitz/habit-app/utils/graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type HabitSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type HabitSubscription = { __typename?: 'Subscription', getHabit?: { __typename?: 'Habit', name: string, id: string } | null | undefined };


export const HabitDocument = gql`
    subscription Habit($id: ID!) {
  getHabit(id: $id) {
    name
    id
  }
}
    `;

/**
 * __useHabitSubscription__
 *
 * To run a query within a React component, call `useHabitSubscription` and pass it any options that fit your needs.
 * When your component renders, `useHabitSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHabitSubscription(baseOptions: Apollo.SubscriptionHookOptions<HabitSubscription, HabitSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HabitSubscription, HabitSubscriptionVariables>(HabitDocument, options);
      }
export type HabitSubscriptionHookResult = ReturnType<typeof useHabitSubscription>;
export type HabitSubscriptionResult = Apollo.SubscriptionResult<HabitSubscription>;