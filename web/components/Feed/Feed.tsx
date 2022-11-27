import React from "react";
import { useSelector } from "react-redux";
import { Header, SideBarLeft, SideBarRight, Main } from "../../components";
import { StateType } from "../../types";
import styles from "./Feed.module.css";
interface Props {}
const Feed: React.FC<Props> = ({}) => {
  const theme = useSelector(({ theme }: StateType) => theme);
  return (
    <div className={theme === "dark" ? styles.feed__dark : styles.feed}>
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
