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
  const renderComponent: any = {
    new_follower: <NewFollower notification={notification} onClose={onClose} />,
    new_friend: <NewFriend notification={notification} onClose={onClose} />,
    birthday_card: (
      <BirthDayCard notification={notification} onClose={onClose} />
    ),
    birthday_card_reaction: (
      <BirthDayCard notification={notification} onClose={onClose} />
    ),
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={async () => {
        await markAsRead({
          variables: {
            input: {
              accessToken: getAccessToken() as any,
              notificationId: notification.id,
            },
          },
        });
      }}
    >
      <ModalContent className={styles.notification__modal__content}>
        <h1>{notification.type.split("_").join(" ")}</h1>
        <div className={styles.notification__modal__content__container}>
          {renderComponent[notification.type]}
        </div>
        <Button
          onClick={async () => {
            await markAsRead({
              variables: {
                input: {
                  accessToken: getAccessToken() as any,
                  notificationId: notification.id,
                },
              },
            });
            onClose();
          }}
        >
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
