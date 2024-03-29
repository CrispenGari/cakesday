import { useDisclosure, Button } from "@chakra-ui/react";
import React from "react";
import {
  MyNotificationsDocument,
  Notification,
  useDeleteNotificationMutation,
  useMarkNotificationAsReadMutation,
} from "../../graphql/generated/graphql";
import NotificationModal from "../NotificationModal/NotificationModal";
import styles from "./Notification.module.css";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { BiBookReader } from "react-icons/bi";
import { getAccessToken } from "../../state";
import { Emoji } from "@crispengari/react-emojify";
import { reactions } from "../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../types";

interface Props {
  notification: Notification;
}
const Notification: React.FC<Props> = ({
  notification: { user, ...notification },
}) => {
  const theme = useSelector(({ theme }: StateType) => theme);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [read, { loading: reading }] = useMarkNotificationAsReadMutation({
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

  const [_delete, { loading: deleting }] = useDeleteNotificationMutation({
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

  const deleteNotification = async () => {
    await _delete({
      variables: {
        input: {
          accessToken: getAccessToken(),
          notificationId: notification.id,
        },
      },
    });
  };
  const markAsRead = async () => {
    await read({
      variables: {
        input: {
          accessToken: getAccessToken(),
          notificationId: notification.id,
        },
      },
    });
  };
  return (
    <div
      className={
        theme === "dark" ? styles.notification__dark : styles.notification
      }
    >
      <NotificationModal
        isOpen={isOpen}
        notification={{
          user,
          ...notification,
        }}
        onClose={onClose}
      />
      <div className={styles.notification__main} onClick={onOpen}>
        <h1>
          {notification.type.split("_").join(" ")}

          {notification.reaction && (
            <Emoji
              style={{
                marginLeft: 10,
              }}
              emojiId={
                reactions.find((r) => r.reaction === notification.reaction)!
                  .emojiId
              }
            />
          )}
        </h1>{" "}
        <div>
          <p>
            <span>{notification.message}</span>
            <span>
              {moment(notification.updatedAtFormattedForMoment).fromNow()}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.notification__buttons}>
        <Button
          isLoading={deleting}
          disabled={reading}
          onClick={deleteNotification}
          title={"delete"}
        >
          <AiOutlineDelete />
        </Button>
        {notification.read ? null : (
          <Button
            isLoading={reading}
            disabled={deleting}
            onClick={markAsRead}
            title="mark as read"
          >
            <BiBookReader />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notification;
