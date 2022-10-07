import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { ChakraProvider, ApolloGraphQLProvider } from "../providers";
import React from "react";
import { __server__base__url__ } from "../constants";
import { getAccessToken, setAccessToken } from "../state";

const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  React.useEffect(() => {
    fetch(`${__server__base__url__}/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const { accessToken } = await res.json();
        setAccessToken(accessToken);
      })
      .catch((error) => console.log(error));
  });
  return <>{children}</>;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <TokenProvider>
        <ApolloGraphQLProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloGraphQLProvider>
      </TokenProvider>
    </ChakraProvider>
  );
};

export default App;
