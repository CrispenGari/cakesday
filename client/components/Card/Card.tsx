import { Avatar } from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../types";
import styles from "./Card.module.css";
interface Props {
  user: UserType;
}
const Card: React.FC<Props> = ({ user: { profile, ...user } }) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${profile?.bannerURL})`,
      }}
    >
      <div className={styles.card__top}>
        <h1>Top</h1>
      </div>

      <div className={styles.card__center}>
        <Avatar
          title={user?.username}
          className={styles.card__avatar}
          name={user?.username}
          src={profile?.photoURL}
        />
      </div>
      <div className={styles.card__bottom}></div>
    </div>
  );
};

export default Card;
