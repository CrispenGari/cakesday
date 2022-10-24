import React from "react";
import { useUserQuery } from "../../graphql/generated/graphql";
import { Explore } from "../../components";
import styles from "./Main.module.css";
interface Props {}
const Main: React.FC<Props> = ({}) => {
  const { loading, data } = useUserQuery({ fetchPolicy: "network-only" });
  return (
    <div className={styles.main}>
      <Explore />
      <pre>{JSON.stringify({ loading, data }, null, 2)}</pre>
      <pre>{JSON.stringify({ loading, data }, null, 2)}</pre>
    </div>
  );
};

export default Main;
