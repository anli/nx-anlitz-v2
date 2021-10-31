import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import React, { FC } from 'react';

type Props = {
  url: string;
};

export const CustomApolloProvider: FC<Props> = ({ children, url }) => {
  const wsLink = new WebSocketLink({
    uri: url.replace('https://', 'wss://'),
    options: {
      reconnect: true,
      minTimeout: 30000,
    },
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
    httpLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
