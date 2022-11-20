import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  MyNotificationsDocument,
  Notification,
  useMarkNotificationAsReadMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import NotificationModal from "../NotificationModal/NotificationModal";
import styles from "./Notification.module.css";
interface Props {
  notification: Notification;
}
const Notification: React.FC<Props> = ({
  notification: { user, ...notification },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [markAsRead, {}] = useMarkNotificationAsReadMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      {
        query: MyNotificationsDocument,
        fetchPolicy: "network-only",
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });

  return (
    <div
      className={styles.notification}
      style={{
        background: notification.read ? "white" : "#ef8c86",
        color: notification.read ? "black" : "white",
      }}
      onClick={async () => {
        await markAsRead({
          variables: {
            input: {
              accessToken: getAccessToken() as any,
              notificationId: notification.id,
            },
          },
        });
        onOpen();
      }}
    >
      <NotificationModal
        isOpen={isOpen}
        notification={{
          user,
          ...notification,
        }}
        onClose={onClose}
      />
      <h1>{notification.type.split("_").join(" ")}</h1>{" "}
      {/* Notification Type  */}
      <p>
        {/* message and time */}
        <span>{notification.message}</span> <span>just now</span>
      </p>
    </div>
  );
};

export default Notification;
