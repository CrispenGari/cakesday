import React from "react";
import styles from "./Drops.module.css";
interface Props {
  children: React.ReactNode;
}
const Drops: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.confetti}>
      {children}
      <div className={styles.squareOne}></div>
      <div className={styles.squareTwo}></div>
      <div className={styles.squareThree}></div>
      <div className={styles.squareFour}></div>
      <div className={styles.squareFive}></div>
      <div className={styles.squareSix}></div>
      <div className={styles.squareSeven}></div>
      <div className={styles.squareEight}></div>
      <div className={styles.squareNine}></div>
      <div className={styles.squareTen}></div>
    </div>
  );
};

export default Drops;
