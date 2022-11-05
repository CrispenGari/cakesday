import React from "react";
import styles from "./Notification.module.css";
interface Props {}
const Notification: React.FC<Props> = ({}) => {
  return (
    <div className={styles.notification}>
      <h1>New Follower</h1> {/* Notification Type  */}
      <p>
        {/* message and time */}
        <span>username0 started following you.</span> <span>just now</span>
      </p>
    </div>
  );
};

export default Notification;
