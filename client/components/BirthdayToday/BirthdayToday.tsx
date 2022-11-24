import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../types";
import { userBirthdayObject } from "../../utils";
import CardsModal from "../CardsModal/CardsModal";
import Drops from "../Drops/Drops";
import styles from "./BirthdayToday.module.css";

interface Props {
  user: UserType;
  isMe: boolean;
}
const BirthdayToday: React.FC<Props> = ({ user, isMe }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className={styles.birthday__card__today}>
      {!!user ? (
        <CardsModal isOpen={isOpen} onClose={onClose} user={user as any} />
      ) : null}
      <Drops>
        <div className={styles.birthday__card__today__container}>
          <h1>Incase you missed it.</h1>
          <h2>{`It's ${isMe ? "your" : user?.username + "'s"} birthday today. ${
            isMe ? "You are" : user?.profile?.gender === "male" ? "He" : "She"
          } is turning:`}</h2>
          <h3>
            {userBirthdayObject(user?.profile?.bday)?.age} <span>years</span>
          </h3>
          <Button onClick={onOpen}>Send Birthday Card</Button>
        </div>
      </Drops>
    </div>
  );
};

export default BirthdayToday;
