import React from "react";
import styles from "./Explore.module.css";
import { User } from "../../components";
interface Props {}
const Explore: React.FC<Props> = ({}) => {
  return (
    <div className={styles.explore}>
      <h1>Explore Friends</h1>
      <div className={styles.explore__main}>
        {Array(10)
          .fill("")
          .map((_, i) => (
            <User key={i.toString()} />
          ))}
      </div>
      <p>These are the list of people that you can be in circle with.</p>
    </div>
  );
};

export default Explore;
