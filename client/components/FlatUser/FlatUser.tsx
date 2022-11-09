import { Avatar, Button } from "@chakra-ui/react";
import React from "react";
import { ProfileType } from "../../types";
import { userBirthdayObject } from "../../utils";
import styles from "./FlatUser.module.css";
interface Props {
  user: ProfileType;
  btnTitle?: string;
  onBtnClick?: () => void;
}
const FlatUser: React.FC<Props> = ({ user, onBtnClick, btnTitle }) => {
  return (
    <div className={styles.flat__user}>
      <div className={styles.flat__user__top}>
        <Avatar
          title={user?.username}
          className={styles.flat__user__avatar}
          name={user?.username}
          src={user?.photoURL}
        />
        <div className={styles.flat__user__info}>
          <h1>{user?.username}</h1>
          <p>
            {user?.gender} &bull;{" "}
            {userBirthdayObject(user?.bday).formattedBirthday} &bull;{" "}
            {userBirthdayObject(user?.bday).age}years
          </p>
        </div>
      </div>
      <Button onClick={onBtnClick}>{btnTitle}</Button>
    </div>
  );
};

export default FlatUser;
