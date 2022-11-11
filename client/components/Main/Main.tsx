import React from "react";
import { useTodaysBirthDaysQuery } from "../../graphql/generated/graphql";
import { Explore, Card } from "../../components";
import styles from "./Main.module.css";
interface Props {}
const Main: React.FC<Props> = ({}) => {
  // const { loading, data } = useMeQuery({ fetchPolicy: "network-only" });
  const { loading, data } = useTodaysBirthDaysQuery({
    fetchPolicy: "network-only",
  });
  return (
    <div className={styles.main}>
      <div className={styles.main__content}>
        <Explore />
        <div className={styles.main__header}>
          <h1>
            <span>Today&rsquo;s Celebrations</span>
            <span></span>
          </h1>
          <p>{new Date().toLocaleDateString()}</p>
        </div>

        {data?.usersBirthday?.map((user) => (
          <Card key={user.id} user={user as any} />
        ))}

        {/* {JSON.stringify(data, null, 2)} */}
        <div className={styles.main__header}>
          <h1>
            <span> Belated Celebrations</span>
            <span></span>
          </h1>
          <p>In case you missed it.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
