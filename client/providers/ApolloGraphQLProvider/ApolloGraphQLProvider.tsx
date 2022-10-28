import React from "react";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloProvider,
  InMemoryCache,

  ApolloClient,
  createHttpLink,

} from "@apollo/client";
import { getAccessToken } from "../../state";
import { __server__base__url__ } from "../../constants";

const cache = new InMemoryCache({});
const httpLink = createHttpLink({
  uri: __server__base__url__,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  credentials: "include",
});

interface Props {
  children: React.ReactNode;
}
const ApolloGraphQLProvider: React.FC<Props> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloGraphQLProvider;
