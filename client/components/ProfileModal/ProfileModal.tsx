import { Modal, ModalContent, Button } from "@chakra-ui/react";
import React from "react";
import { FollowerType, ProfileType } from "../../types";
import FlatUser from "../FlatUser/FlatUser";
import styles from "./ProfileModal.module.css";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  data: {
    isMe: boolean;
    title: string;
    username: string;
    users: ProfileType[] | FollowerType[] | FollowerType[];
  };
}
const ProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data: { title, isMe, username, users },
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className={styles.profile__modal__content}>
        <h1>{`${isMe ? "Your " : username} ${title}`}</h1>
        <div className={styles.profile__modal__content__container}>
          {users.map((user) => (
            <FlatUser
              color="primary"
              size="normal"
              key={user.id}
              user={user}
              btnTitle={"unfollow"}
            />
          ))}
        </div>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
