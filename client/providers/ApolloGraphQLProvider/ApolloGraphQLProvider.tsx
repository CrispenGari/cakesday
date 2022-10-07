import React from "react";

import { onError } from "apollo-link-error";
// import { ApolloLink, Observable } from "apollo-link";
import {
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloClient,
  createHttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { getAccessToken } from "../../state";
import { __server__base__url__ } from "../../constants";

const cache = new InMemoryCache({});
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            console.log("setting the header");
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
          } else {
            console.log("No access token");
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);
const client = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    createHttpLink({
      uri: __server__base__url__,
      credentials: "include",
    }),
  ]),
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
