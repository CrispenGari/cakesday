import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Profile } from "../../graphql/generated/graphql";
import { userBirthdayObject } from "../../utils";

import styles from "./FlatUser.module.css";
interface Props {
  user: Profile;
  btnTitle?: string;
  onBtnClick?: () => void;
  size: "small" | "normal";
  color: "primary" | "secondary";
  loading?: boolean;
}
const FlatUser: React.FC<Props> = ({
  user,
  onBtnClick,
  btnTitle,
  size,
  color,
  loading,
}) => {
  const router = useRouter();
  return (
    <div className={styles.flat__user}>
      <div className={styles.flat__user__top}>
        <Avatar
          onClick={() => {
            router.push(`/profile/${user.id}`);
          }}
          title={user?.username}
          className={
            size === "normal"
              ? styles.flat__user__avatar
              : styles.flat__user__avatar__small
          }
          name={user?.username}
          src={user?.photoURL ?? ""}
        />
        <div
          className={
            size === "normal"
              ? styles.flat__user__info
              : styles.flat__user__info__small
          }
        >
          <h1
            onClick={() => {
              router.push(`/profile/${user.id}`);
            }}
          >
            {user?.username}
          </h1>
          <p>
            {user?.gender} &bull;{" "}
            {userBirthdayObject(user?.bday).formattedBirthday}
            {size === "normal"
              ? ` • ${userBirthdayObject(user?.bday).age}years`
              : ""}
          </p>
        </div>
      </div>
      <Button
        className={
          color === "primary"
            ? styles.flat__user__primary__btn
            : styles.flat__user__secondary__btn
        }
        onClick={onBtnClick}
        isLoading={loading}
      >
        {btnTitle}
      </Button>
    </div>
  );
};

export default FlatUser;
