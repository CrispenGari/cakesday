import React from "react";
import styles from "./Loading.module.css";
interface Props {}
const Loading: React.FC<Props> = ({}) => {
  return (
    <div className={styles.loading}>
      <h1>
        Loading<span>.</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </h1>
    </div>
  );
};

export default Loading;
