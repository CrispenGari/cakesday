import { useDisclosure, Avatar, Badge } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { User } from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import { dateDiffFromToday, userBirthdayObject } from "../../utils";
import ViewProfileModal from "../ViewProfileModal/ViewProfileModal";

import styles from "./UserResult.module.css";
interface Props {
  user: User;
  btnTitle?: string;
  onBtnClick?: () => void;
  meUsername: string;
}
const UserResult: React.FC<Props> = ({ user, meUsername }) => {
  const router = useRouter();
  const theme = useSelector(({ theme }: StateType) => theme);
  const {
    isOpen: isOpenProfileModal,
    onOpen: onOpenProfileModal,
    onClose: onCloseProfileModal,
  } = useDisclosure();

  return (
    <div
      className={
        theme === "dark" ? styles.user__result__dark : styles.user__result
      }
    >
      {user && (
        <ViewProfileModal
          profile={user.profile!}
          isOpen={isOpenProfileModal}
          onClose={onCloseProfileModal}
          imageType="avatar"
        />
      )}
      <div className={styles.user__result__top}>
        <Avatar
          onClick={onOpenProfileModal}
          title={user?.username}
          className={styles.user__result__avatar}
          name={user?.username}
          src={user?.profile?.photoURL ?? ""}
        />
        <div className={styles.user__result__info}>
          <div className={styles.user__result__info__badges}>
            {!!user.followings?.find((f) => f.username === meUsername) &&
            !!user.followers?.find((f) => f.username === meUsername) ? (
              <Badge
                borderRadius="full"
                px="2"
                className={styles.user__result__info__badge}
              >
                friends
              </Badge>
            ) : !!user.followers?.find((f) => f.username === meUsername) ? (
              <Badge
                borderRadius="full"
                px="2"
                className={styles.user__result__info__badge}
              >
                following
              </Badge>
            ) : !!user.followings?.find((f) => f.username === meUsername) ? (
              <Badge
                borderRadius="full"
                px="2"
                className={styles.user__result__info__badge}
              >
                follower
              </Badge>
            ) : null}
            {dateDiffFromToday(new Date(Number(user.createdAt))).isNew && (
              <Badge
                borderRadius="full"
                px="2"
                className={styles.user__result__info__badge}
              >
                following
              </Badge>
            )}
          </div>
          <h1
            onClick={() => {
              router.push(`/profile/${user?.id}`);
            }}
          >
            {user?.username}
          </h1>
          <p>
            {user?.profile?.gender} &bull;{" "}
            {userBirthdayObject(user?.profile?.bday).formattedBirthday}
            {` • ${userBirthdayObject(user?.profile?.bday).age} years`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserResult;
