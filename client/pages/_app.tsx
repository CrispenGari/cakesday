import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import {
  ChakraProvider,
  ApolloGraphQLProvider,
  ReduxProvider,
} from "../providers";
import React from "react";
import { __server__base__url__ } from "../constants";

import { RefreshTokenProvider } from "../providers";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RefreshTokenProvider>
      <Component {...pageProps} />
    </RefreshTokenProvider>
  );
};

export default App;
