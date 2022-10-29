import type { NextPage } from "next";
import { Feed, Loading, Welcome } from "../components";
import { __server__base__url__ } from "../constants";
import { useMeQuery } from "../graphql/generated/graphql";
import styles from "../styles/Home.module.css";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const userCookie: string = context.req.cookies?.user;
//   const validCookie = await apolloClient.query({
//     query: COOKIE_QUERY,
//     variables: {
//       input: userCookie ? userCookie : "",
//     },
//   });
//   if (!validCookie.data?.cookie) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/auth/login",
//       },
//     };
//   }
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

const Home: NextPage = () => {
  const { loading, data } = useMeQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <Loading />;
  }
  return <div className={styles.home}>{data?.me ? <Feed /> : <Welcome />}</div>;
};

export default Home;
