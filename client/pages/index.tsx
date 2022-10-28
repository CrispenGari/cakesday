import type { NextPage } from "next";
import { Feed, Loading, Welcome } from "../components";
import { __server__base__url__ } from "../constants";
import { useMeQuery } from "../graphql/generated/graphql";
import styles from "../styles/Home.module.css";
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
