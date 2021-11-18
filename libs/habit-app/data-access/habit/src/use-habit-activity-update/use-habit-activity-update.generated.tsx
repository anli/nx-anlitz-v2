import * as Types from '@nx-anlitz/habit-app/utils/graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type HabitActivityUpdateMutationVariables = Types.Exact<{
  input: Types.UpdateHabitActivityInput;
}>;


export type HabitActivityUpdateMutation = { __typename?: 'Mutation', updateHabitActivity?: { __typename?: 'UpdateHabitActivityPayload', numUids?: number | null | undefined } | null | undefined };


export const HabitActivityUpdateDocument = gql`
    mutation HabitActivityUpdate($input: UpdateHabitActivityInput!) {
  updateHabitActivity(input: $input) {
    numUids
  }
}
    `;
export type HabitActivityUpdateMutationFn = Apollo.MutationFunction<HabitActivityUpdateMutation, HabitActivityUpdateMutationVariables>;

/**
 * __useHabitActivityUpdateMutation__
 *
 * To run a mutation, you first call `useHabitActivityUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHabitActivityUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [habitActivityUpdateMutation, { data, loading, error }] = useHabitActivityUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHabitActivityUpdateMutation(baseOptions?: Apollo.MutationHookOptions<HabitActivityUpdateMutation, HabitActivityUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HabitActivityUpdateMutation, HabitActivityUpdateMutationVariables>(HabitActivityUpdateDocument, options);
      }
export type HabitActivityUpdateMutationHookResult = ReturnType<typeof useHabitActivityUpdateMutation>;
export type HabitActivityUpdateMutationResult = Apollo.MutationResult<HabitActivityUpdateMutation>;
export type HabitActivityUpdateMutationOptions = Apollo.BaseMutationOptions<HabitActivityUpdateMutation, HabitActivityUpdateMutationVariables>;