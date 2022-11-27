import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { __server__base__url__ } from "../constants";

import { RefreshTokenProvider } from "../providers";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <RefreshTokenProvider>
        <Component {...pageProps} />
      </RefreshTokenProvider>
    </ErrorBoundary>
  );
};

export default App;
