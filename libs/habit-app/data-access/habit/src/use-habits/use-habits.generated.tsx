import * as Types from '@nx-anlitz/habit-app/utils/graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type HabitsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type HabitsSubscription = { __typename?: 'Subscription', getUser?: { __typename?: 'User', habits?: Array<{ __typename?: 'Habit', id: string, name: string } | null | undefined> | null | undefined } | null | undefined };


export const HabitsDocument = gql`
    subscription Habits {
  getUser(id: "alice@anlitz.com") {
    habits {
      id
      name
    }
  }
}
    `;

/**
 * __useHabitsSubscription__
 *
 * To run a query within a React component, call `useHabitsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useHabitsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useHabitsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<HabitsSubscription, HabitsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HabitsSubscription, HabitsSubscriptionVariables>(HabitsDocument, options);
      }
export type HabitsSubscriptionHookResult = ReturnType<typeof useHabitsSubscription>;
export type HabitsSubscriptionResult = Apollo.SubscriptionResult<HabitsSubscription>;