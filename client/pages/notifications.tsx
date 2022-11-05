import React from "react";
import { Header, Notification } from "../components";
import styles from "../styles/Notifications.module.css";
interface Props {}
const Notifications: React.FC<Props> = ({}) => {
  const notifications = Array(3).fill(null);
  return (
    <div className={styles.notifications}>
      <Header />
      <div
        className={
          notifications.length !== 0
            ? styles.notifications__main
            : styles.notifications__main__none
        }
      >
        <div className={styles.notifications__main__section}>
          <span>New Notifications</span> <span></span>
        </div>
        {
          notifications.length === 0 ? (
            <h1>No notifications.</h1>
          ) : (
            notifications.map((_, index) => <Notification key={index} />)
          )

          // show notifications
        }
        <div className={styles.notifications__main__section}>
          <span>Old Notifications</span> <span></span>
        </div>
        {
          notifications.length === 0 ? (
            <h1>No notifications.</h1>
          ) : (
            notifications.map((_, index) => <Notification key={index} />)
          )

          // show notifications
        }
      </div>
    </div>
  );
};

export default Notifications;
