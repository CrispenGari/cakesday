import { Avatar, Button } from "@chakra-ui/react";
import React from "react";
import styles from "./SideBarRight.module.css";
interface Props {}

const SideBarRight: React.FC<Props> = ({}) => {
  return (
    <div className={styles.sidebar__right}>
      <div className={styles.sidebar__right__top}>
        <h1>@username</h1>
        <Avatar
          className={styles.sidebar__right__top__avatar}
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
        <Button>Profile</Button>
        <h2>Birthday 10/15/1999</h2>
      </div>
      <Button>Sign Out</Button>
    </div>
  );
};

export default SideBarRight;
