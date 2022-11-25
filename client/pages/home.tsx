import { GetServerSidePropsContext } from "next";
import React from "react";
import { Header, Main, SideBarLeft, SideBarRight } from "../components";
import { ImAuthenticatedDocument } from "../graphql/generated/graphql";
import { client } from "../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { ColorThemes } from "../constants";
import { useSelector } from "react-redux";
import { StateType } from "../types";
const Home: NextPage = () => {
  const theme = useSelector(({ theme }: StateType) => theme);
  return (
    <div
      className={styles.home}
      style={{
        backgroundColor:
          theme === "dark" ? ColorThemes.DARK_BODY : ColorThemes.LIGHT_BODY,
      }}
    >
      <div className={styles.home__feed}>
        <Header />
        <div className={styles.home__feed__main}>
          <SideBarRight />
          <Main />
          <SideBarLeft />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const refreshToken = context.req.cookies?.qid ?? "";
  const { data } = await client.mutate({
    mutation: ImAuthenticatedDocument,
    variables: {
      input: {
        refreshToken,
      },
    },
  });
  if (data?.imAuthenticated?.imAuthenticated === false) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
