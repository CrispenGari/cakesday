import { Button } from "@chakra-ui/react";
import React from "react";
import styles from "./SideBarLeft.module.css";
interface Props {}
const SideBarLeft: React.FC<Props> = ({}) => {
  return (
    <div className={styles.sidebar__left}>
      <h1>Birthdays</h1>
      <div className={styles.sidebar__left__main}></div>
      <Button>Explore</Button>
    </div>
  );
};

export default SideBarLeft;
