import { Avatar, Button, useDisclosure } from "@chakra-ui/react";
import { Emoji } from "@crispengari/react-emojify";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { UserType } from "../../types";
import { userBirthdayObject } from "../../utils";
import CardsModal from "../CardsModal/CardsModal";
import Drops from "../Drops/Drops";
import styles from "./Card.module.css";
interface Props {
  user: UserType;
}
const Card: React.FC<Props> = ({ user: { profile, ...user } }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${profile?.bannerURL})`,
      }}
    >
      <CardsModal
        isOpen={isOpen}
        onClose={onClose}
        user={
          {
            ...user,
            profile: {
              ...profile,
            } as any,
          } as any
        }
      />
      <Drops>
        <div className={styles.card__container}>
          <div className={styles.card__top}>
            <h1
              onClick={() => {
                router.push(`/profile/${user.id}`);
              }}
            >
              {user.username} • {profile?.gender} •{" "}
              {userBirthdayObject(profile?.bday).formattedBirthday}
            </h1>
          </div>
          <div className={styles.card__center}>
            <Avatar
              title={user?.username}
              className={styles.card__avatar}
              name={user?.username}
              src={profile?.photoURL}
            />
          </div>
          <h3>
            {userBirthdayObject(profile?.bday).age} <span>years</span>
          </h3>
          <div className={styles.card__bottom}>
            <Button onClick={onOpen}>SEND WISH</Button>
            <Button>IGNORE</Button>
          </div>
          <div className={styles.card__bio}>
            <p>
              Send birthday card to{" "}
              <Link href={`/profile/${user.id}`}>{profile?.username}</Link>{" "}
              {profile?.gender === "male" ? "he" : "she"} just turned{" "}
              <strong>{userBirthdayObject(profile?.bday).age} </strong>{" "}
              recently.
            </p>
          </div>
        </div>
      </Drops>
    </div>
  );
};

export default Card;
