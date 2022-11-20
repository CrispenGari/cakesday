import React from "react";
import { useSelector } from "react-redux";
import { Header, Notification } from "../components";
import styles from "../styles/Notifications.module.css";
import { StateType } from "../types";
interface Props {}
const Notifications: React.FC<Props> = ({}) => {
  const { notifications } = useSelector((state: StateType) => state);
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
        {notifications.filter((notification) => !notification.read).length ===
        0 ? (
          <h1>No notifications.</h1>
        ) : (
          notifications
            .filter((notification) => !notification.read)
            .map((notification) => (
              <Notification notification={notification} key={notification.id} />
            ))
        )}
        <div className={styles.notifications__main__section}>
          <span>Old Notifications</span> <span></span>
        </div>
        {
          notifications.filter((notification) => notification.read).length ===
          0 ? (
            <h1>No notifications.</h1>
          ) : (
            notifications
              .filter((notification) => notification.read)
              .map((notification) => (
                <Notification
                  notification={notification}
                  key={notification.id}
                />
              ))
          )

          // show notifications
        }
      </div>
    </div>
  );
};

export default Notifications;
