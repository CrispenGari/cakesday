import React from "react";
import styles from "../styles/NotFound.module.css";
interface Props {}
const NotFound: React.FC<Props> = ({}) => {
  return (
    <div className={styles.not__found}>
      <h1>Hello from NotFound</h1>
    </div>
  );
};

export default NotFound;
