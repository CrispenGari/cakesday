import { Modal, ModalContent, Button } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { freeCards } from "../../constants";
import { User } from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import FreeBirthdayCard from "../Cards/Free/FreeBirthdayCard";
import styles from "./CardsModal.module.css";
interface Props {
  onClose: () => void;
  isOpen: boolean;
  user: User;
}
const CardsModal: React.FC<Props> = ({ onClose, isOpen, user }) => {
  const theme = useSelector(({ theme }: StateType) => theme);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        className={
          theme === "dark"
            ? styles.cards__modal__content__dark
            : styles.cards__modal__content
        }
      >
        <h1>Send Birthday card to {user.username}.</h1>
        <div className={styles.cards__modal__content__container}>
          {freeCards.map((card, index) => (
            <FreeBirthdayCard
              key={index}
              card={card}
              user={user}
              onClose={onClose}
            />
          ))}
        </div>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default CardsModal;
