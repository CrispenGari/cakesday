import { Button } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../../graphql/generated/graphql";
import FlatUser from "../FlatUser/FlatUser";
import styles from "./SideBarLeft.module.css";
interface Props {}
const SideBarLeft: React.FC<Props> = ({}) => {
  const { data: me } = useMeQuery({ fetchPolicy: "network-only" });
  return (
    <div className={styles.sidebar__left}>
      <h1>Birthdays</h1>
      <div className={styles.sidebar__left__lists}></div>
      <h1>Who follows you?</h1>
      <div className={styles.sidebar__left__lists}>
        {me?.me?.followers.map((follower) => (
          <FlatUser
            key={follower.id}
            user={follower as any}
            btnTitle={"follow back"}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBarLeft;
