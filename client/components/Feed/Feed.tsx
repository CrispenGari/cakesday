import React from "react";
import { Header, SideBarLeft, SideBarRight, Main } from "../../components";
import styles from "./Feed.module.css";
interface Props {}
const Feed: React.FC<Props> = ({}) => {
  return (
    <div className={styles.feed}>
      <Header />
      <div className={styles.feed__main}>
        <SideBarRight />
        <Main />
        <SideBarLeft />
      </div>
    </div>
  );
};

export default Feed;
