import React from "react";
import styles from "./NotificationModal.module.css";
import { Modal, ModalContent, Button } from "@chakra-ui/react";
import {
  MyNotificationsDocument,
  Notification,
  useMarkNotificationAsReadMutation,
} from "../../graphql/generated/graphql";
import NewFollower from "./NewFollower/NewFollower";
import { getAccessToken } from "../../state";
import BirthDayCard from "./BirthDayCard/BirthDayCard";
import NewFriend from "./NewFriend/NewFriend";
import { useSelector } from "react-redux";
import { StateType } from "../../types";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  notification: Notification;
}
const NotificationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  notification,
}) => {
  const theme = useSelector(({ theme }: StateType) => theme);
  const [markAsRead, { data }] = useMarkNotificationAsReadMutation({
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
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (data?.markAsRead) {
        onClose();
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, onClose]);

  const closeModalAndReadNotification = async () => {
    await markAsRead({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          notificationId: notification.id,
        },
      },
    });
    onClose();
  };
  const renderComponent: any = {
    new_follower: (
      <NewFollower
        notification={notification}
        onClose={closeModalAndReadNotification}
      />
    ),
    new_friend: <NewFriend notification={notification} />,
    birthday_card: (
      <BirthDayCard
        notification={notification}
        onClose={closeModalAndReadNotification}
      />
    ),
    birthday_card_reaction: (
      <BirthDayCard
        notification={notification}
        onClose={closeModalAndReadNotification}
      />
    ),
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModalAndReadNotification}>
      <ModalContent
        className={
          theme === "dark"
            ? styles.notification__modal__content__dark
            : styles.notification__modal__content
        }
      >
        <h1>{notification.type.split("_").join(" ")}</h1>
        <div className={styles.notification__modal__content__container}>
          {renderComponent[notification.type]}
        </div>
        <Button onClick={closeModalAndReadNotification}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
