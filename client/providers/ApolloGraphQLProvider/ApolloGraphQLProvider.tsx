import {
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloClient,
  ApolloLink,
  Observable,
  split,
} from "@apollo/client";
import jwtDecode from "jwt-decode";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, setAccessToken } from "../../state";
import { __server__base__url__ } from "../../constants";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        uri: "ws://localhost:3001/graphql",
        options: {
          reconnect: true,
        },
      })
    : null;
const cache = new InMemoryCache({});

const tokenLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    try {
      const { exp }: any = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${__server__base__url__}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken: string) => {
    setAccessToken(accessToken);
  },
  handleError: (err: any) => {
    console.warn("your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
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

const httpLink = createUploadLink({
  uri: `${__server__base__url__}/graphql`,
  credentials: "include",
});

const splitLink =
  typeof window !== "undefined" && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        ApolloLink.from([tokenLink, requestLink, httpLink])
      )
    : ApolloLink.from([tokenLink, requestLink, httpLink]);
export const client = new ApolloClient({
  link: splitLink,
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
