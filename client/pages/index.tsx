import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Feed, Loading, Welcome } from "../components";
import { __server__base__url__ } from "../constants";
import { useUserQuery } from "../graphql/generated/graphql";
import { setAccessToken } from "../state";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

  const { loading: l, data } = useUserQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setLoading(l);
  }, [l]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>{!data?.user ? <Feed /> : <Welcome />}</div>
  );
};

export default Home;
