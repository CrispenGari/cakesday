import React from "react";
import styles from "./User.module.css";
import { Box, Image, Badge, Button, Avatar } from "@chakra-ui/react";
import { UserType } from "../../types";
import { userBirthdayObject } from "../../utils";

interface Props {
  friend: UserType;
}
const User: React.FC<Props> = ({
  friend: { profile, followers, followings, username },
}) => {
  return (
    <div className={styles.user}>
      <div
        className={styles.user__banner}
        style={{
          backgroundImage: `url(${profile?.bannerURL})`,
        }}
      >
        <Badge borderRadius="full" px="2" className={styles.user__badge}>
          New
        </Badge>
        <Avatar
          title={username}
          className={styles.user__avatar}
          name={username}
          src={profile?.photoURL}
        />
      </div>
      <h1>@{username}</h1>
      <h2>
        {userBirthdayObject(profile?.bday).age} <span>years</span>
      </h2>
      <p>
        Birthday {userBirthdayObject(profile?.bday).formattedBirthday} &bull;{" "}
        {profile?.gender}
      </p>
      <div className={styles.user__buttons}>
        <Button>Add</Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
};

export default User;
