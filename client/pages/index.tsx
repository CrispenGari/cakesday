import type { GetServerSidePropsContext, NextPage } from "next";
import { Loading } from "../components";
import { __server__base__url__ } from "../constants";
import { ImAuthenticatedDocument } from "../graphql/generated/graphql";
import { client } from "../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";

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
  if (data?.imAuthenticated?.imAuthenticated === true) {
    return {
      redirect: {
        permanent: true,
        destination: "/home",
      },
    };
  }
  return {
    props: {},
    redirect: {
      permanent: true,
      destination: "/welcome",
    },
  };
}

const CakesDay: NextPage = () => <Loading />;

export default CakesDay;
