import React from "react";
import { useMeQuery } from "../../graphql/generated/graphql";
import { Explore } from "../../components";
import styles from "./Main.module.css";
interface Props {}
const Main: React.FC<Props> = ({}) => {
  const { loading, data } = useMeQuery({ fetchPolicy: "network-only" });
  return (
    <div className={styles.main}>
      <Explore />
      <h1>Today&rsquo;s Celebrations</h1>
    </div>
  );
};

export default Main;
