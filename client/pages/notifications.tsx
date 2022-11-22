import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../actions";
import { Header, Notification } from "../components";
import { useMyNotificationsQuery } from "../graphql/generated/graphql";
import { getAccessToken } from "../state";
import styles from "../styles/Notifications.module.css";
import { StateType } from "../types";
interface Props {}
const Notifications: React.FC<Props> = ({}) => {
  const { data } = useMyNotificationsQuery({
    fetchPolicy: "network-only",
    variables: {
      input: {
        accessToken: getAccessToken(),
      },
    },
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      dispatch(setNotifications(data?.myNotifications ?? []));
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  return (
    <div className={styles.notifications}>
      <Header />
      <div
        className={
          data?.myNotifications.length !== 0
            ? styles.notifications__main
            : styles.notifications__main__none
        }
      >
        <div className={styles.notifications__main__section}>
          <span>New Notifications</span> <span></span>
        </div>
        {data?.myNotifications.filter((notification) => !notification.read)
          .length === 0 ? (
          <h2>No new notifications.</h2>
        ) : (
          data?.myNotifications
            .filter((notification) => !notification.read)
            .map((notification) => (
              <Notification
                notification={notification as any}
                key={notification.id}
              />
            ))
        )}
        <div className={styles.notifications__main__section}>
          <span>Old Notifications</span> <span></span>
        </div>
        {
          data?.myNotifications.filter((notification) => notification.read)
            .length === 0 ? (
            <h2>No old notifications.</h2>
          ) : (
            data?.myNotifications
              .filter((notification) => notification.read)
              .map((notification) => (
                <Notification
                  notification={notification as any}
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
