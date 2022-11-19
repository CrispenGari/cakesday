import { Avatar } from "@chakra-ui/react";
import { Emoji } from "@crispengari/react-emojify";
import React from "react";
import { UserType } from "../../types";
import { userBirthdayObject } from "../../utils";
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
        <h1>
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
        {[
          "react@emojify-16",
          "react@emojify-784",
          "react@emojify-17",
          "react@emojify-14",
          "react@emojify-13",
          "react@emojify-18",
          "react@emojify-783",
        ].map((em) => (
          <button key={em}>
            send <Emoji emojiId={em} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Card;
