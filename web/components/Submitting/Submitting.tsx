import React from "react";
import styles from "./Submitting.module.css";
interface Props {
  borderRadius?: number;
}
const Submitting: React.FC<Props> = ({ borderRadius }) => {
  return (
    <div
      className={styles.submitting}
      style={{
        borderRadius: borderRadius ? borderRadius : 5,
      }}
    >
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Submitting;
