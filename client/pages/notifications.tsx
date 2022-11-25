import React from "react";
import { useDispatch } from "react-redux";
import { setNotifications } from "../actions";
import { Header, Notification } from "../components";
import { useMyNotificationsQuery } from "../graphql/generated/graphql";
import { getAccessToken } from "../state";
import styles from "../styles/Notifications.module.css";
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
      dispatch(setNotifications((data?.myNotifications as any) ?? []));
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  return (
    <div className={styles.notifications}>
      <Header />
      <div className={styles.notifications__main}>
        <div className={styles.notifications__main__section}>
          <span>UnRead Notifications</span> <span></span>
        </div>
        {data?.myNotifications.filter((notification) => !notification.read)
          .length === 0 ? (
          <h2>No unread notifications.</h2>
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
          <span>Read Notifications</span> <span></span>
        </div>
        {
          data?.myNotifications.filter((notification) => notification.read)
            .length === 0 ? (
            <h2>No read notifications.</h2>
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
