import { GetServerSidePropsContext } from "next";
import React from "react";
import { Header, Main, SideBarLeft, SideBarRight } from "../components";
import { ImAuthenticatedDocument } from "../graphql/generated/graphql";
import { client } from "../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
const Home: NextPage = () => {
  return (
    <div className={styles.home}>
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
  const { data, errors } = await client.mutate({
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
