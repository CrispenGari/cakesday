import React from "react";
import {
  useTodaysBirthDaysQuery,
  useUsersBelatedBirthdaysQuery,
} from "../../graphql/generated/graphql";
import { Explore, Card } from "../../components";
import styles from "./Main.module.css";

interface Props {}
const Main: React.FC<Props> = ({}) => {
  const { data } = useTodaysBirthDaysQuery({
    fetchPolicy: "network-only",
  });
  const { data: belatedBdays } = useUsersBelatedBirthdaysQuery({
    fetchPolicy: "network-only",
  });
  return (
    <div className={styles.main}>
      <div className={styles.main__content}>
        <Explore />
        <div className={styles.main__content__cards}>
          <div className={styles.main__header}>
            <h1>
              <span>Today&rsquo;s Celebrations</span>
              <span></span>
            </h1>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className={styles.main__content__cards__container}>
            {data?.usersBirthday?.map((user) => (
              <Card key={user.id} user={user as any} />
            ))}
          </div>
        </div>

        <div className={styles.main__content__cards}>
          <div className={styles.main__header}>
            <h1>
              <span>Belated Celebrations</span>
              <span></span>
            </h1>
            <p>Incase you missed it.</p>
          </div>
          <div className={styles.main__content__cards__container}>
            {belatedBdays?.usersBelatedBirthdays?.map((user) => (
              <Card key={user.id} user={user as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
