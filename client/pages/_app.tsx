import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { ChakraProvider, ApolloGraphQLProvider } from "../providers";
import React from "react";
import { __server__base__url__ } from "../constants";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <ApolloGraphQLProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloGraphQLProvider>
    </ChakraProvider>
  );
};

export default App;
