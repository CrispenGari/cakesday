import React from "react";
import styles from "./SideBarLeft.module.css";
interface Props {}
const SideBarLeft: React.FC<Props> = ({}) => {
  return (
    <div className={styles.sidebar__left}>
      <h1></h1>
    </div>
  );
};

export default SideBarLeft;
