import { Button } from "@chakra-ui/react";
import React from "react";
import {
  useMeQuery,
  useTodaysBirthDaysQuery,
  useUserByIdLazyQuery,
  useUsersBelatedBirthdaysQuery,
} from "../../graphql/generated/graphql";
import FlatUser from "../FlatUser/FlatUser";
import styles from "./SideBarLeft.module.css";
interface Props {}
const SideBarLeft: React.FC<Props> = ({}) => {
  const { data: me } = useMeQuery({ fetchPolicy: "network-only" });
  const { data: belatedBdays } = useUsersBelatedBirthdaysQuery({
    fetchPolicy: "network-only",
  });
  const { data: todaysBirthdays } = useTodaysBirthDaysQuery({
    fetchPolicy: "network-only",
  });

  return (
    <div className={styles.sidebar__left}>
      <h1>Birthdays</h1>
      <div className={styles.sidebar__left__lists}>
        <p>
          <span>Today</span> <span></span>
        </p>
        {todaysBirthdays?.usersBirthday?.map((user) => (
          <FlatUser
            key={user.id}
            user={user.profile as any}
            btnTitle={"Send Wish"}
            size="small"
            color="secondary"
          />
        ))}
        <p>
          <span>Belated</span> <span></span>
        </p>
        {belatedBdays?.usersBelatedBirthdays?.map((user) => (
          <FlatUser
            key={user.id}
            user={user.profile as any}
            btnTitle={"Send Wish"}
            size="small"
            color="secondary"
          />
        ))}
      </div>
      <h1>Who follows you?</h1>
      <div className={styles.sidebar__left__lists}>
        {me?.me?.followers.map((follower) => (
          <FlatUser
            key={follower.id}
            user={follower as any}
            btnTitle={"follow back"}
            size="small"
            color="secondary"
          />
        ))}
      </div>
    </div>
  );
};

export default SideBarLeft;
