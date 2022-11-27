import React from "react";
import styles from "./Loading.module.css";
interface Props {}
const Loading: React.FC<Props> = ({}) => {
  return (
    <div className={styles.loading}>
      <div></div>
    </div>
  );
};

export default Loading;
