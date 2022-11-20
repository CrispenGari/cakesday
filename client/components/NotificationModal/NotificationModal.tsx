import React from "react";
import styles from "./NotificationModal.module.css";
import { Modal, ModalContent, Button } from "@chakra-ui/react";
import { Notification } from "../../graphql/generated/graphql";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className={styles.notification__modal__content}>
        <h1>Notification</h1>
        <div className={styles.notification__modal__content__container}>
          content
        </div>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
