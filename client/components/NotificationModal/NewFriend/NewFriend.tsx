import { Button, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Notification } from "../../../graphql/generated/graphql";
import { userBirthdayObject } from "../../../utils";
import styles from "./NewFriend.module.css";
interface Props {
  notification: Notification;
}
const NewFriend: React.FC<Props> = ({ notification }) => {
  const router = useRouter();
  return (
    <div className={styles.new__friend}>
      <h1>{notification.message}</h1>
      <div className={styles.new__friend__user}>
        <Avatar
          onClick={() => {
            router.push(`/profile/${notification.fromId}`);
          }}
          title={notification.fromUsername}
          className={styles.new__friend__user__avatar}
          name={notification.fromUsername}
          src={notification.fromPhotoURL ?? ""}
        />
        <div className={styles.new__friend__user__info}>
          <h1
            onClick={() => {
              router.push(`/profile/${notification.fromId}`);
            }}
          >
            {notification.fromUsername}
          </h1>
          <p>
            {notification.fromGender} &bull;{" "}
            {userBirthdayObject(notification.fromBDay).formattedBirthday}
            {` • ${userBirthdayObject(notification.fromBDay).age}years`}
          </p>
          <Button
            onClick={() => {
              router.push(`/profile/${notification.fromId}`);
            }}
          >
            Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFriend;
