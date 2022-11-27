import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Loading } from "../../components";
import Layout from "../../components/Layout/Layout";
import { __server__base__url__ } from "../../constants";
import { setAccessToken } from "../../state";
import ApolloGraphQLProvider from "../ApolloGraphQLProvider/ApolloGraphQLProvider";
import ReduxProvider from "../ReduxProvider/ReduxProvider";

interface Props {
  children: React.ReactNode;
}
const RefreshTokenProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${__server__base__url__}/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const { accessToken } = await res.json();
        setLoading(false);
        setAccessToken(accessToken ?? "");
      })
      .catch((error) => console.log(error));
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <ChakraProvider>
      <ReduxProvider>
        <ApolloGraphQLProvider>
          <Layout>{children}</Layout>
        </ApolloGraphQLProvider>
      </ReduxProvider>
    </ChakraProvider>
  );
};

export default RefreshTokenProvider;
