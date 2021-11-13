import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import React, { FC } from 'react';

type Props = {
  url: string;
  authToken?: string;
};

export const CustomApolloProvider: FC<Props> = ({
  children,
  url,
  authToken,
}) => {
  const wsLink = new WebSocketLink({
    uri: url.replace('https://', 'wss://'),
    options: {
      reconnect: true,
      minTimeout: 30000,
      connectionParams: {
        'X-Auth-Token': authToken,
      },
    },
  });

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!authToken) return { headers, ...rest };

    return {
      ...rest,
      headers: {
        ...headers,
        'X-Auth-Token': authToken,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: url,
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            queryHabit: {
              merge: true,
            },
          },
        },
      },
    }),
    link: splitLink,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
