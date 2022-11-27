import React from "react";
import styles from "./User.module.css";
import { Badge, Button, Avatar, useDisclosure } from "@chakra-ui/react";
import { dateDiffFromToday, userBirthdayObject } from "../../utils";
import { useRouter } from "next/router";
import {
  FriendsSuggestionsDocument,
  MeDocument,
  useFollowUserMutation,
  useIgnoreUserMutation,
  User,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import ViewProfileModal from "../ViewProfileModal/ViewProfileModal";
interface Props {
  friend: User;
}
const User: React.FC<Props> = ({
  friend: { profile, username, id, createdAt },
}) => {
  const router = useRouter();
  const theme = useSelector(({ theme }: StateType) => theme);
  const {
    isOpen: isOpenProfileModal,
    onOpen: onOpenProfileModal,
    onClose: onCloseProfileModal,
  } = useDisclosure();
  const [followUser, { loading: following }] = useFollowUserMutation({
    refetchQueries: [
      { query: MeDocument },
      {
        query: FriendsSuggestionsDocument,
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
    fetchPolicy: "network-only",
    variables: {
      input: {
        accessToken: getAccessToken() as any,
        friendUsername: username,
      },
    },
  });

  const [ignoreUser, { loading: ignoring }] = useIgnoreUserMutation({
    refetchQueries: [
      { query: MeDocument },
      {
        query: FriendsSuggestionsDocument,
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
    fetchPolicy: "network-only",
    variables: {
      input: {
        accessToken: getAccessToken() as any,
        friendUsername: username,
      },
    },
  });

  return (
    <div className={theme === "dark" ? styles.user__dark : styles.user}>
      {profile && (
        <ViewProfileModal
          profile={profile}
          isOpen={isOpenProfileModal}
          onClose={onCloseProfileModal}
          imageType="avatar"
        />
      )}
      <div
        className={styles.user__banner}
        style={{
          backgroundImage: `url(${profile?.bannerURL})`,
        }}
      >
        {dateDiffFromToday(new Date(Number(createdAt))).isNew ? (
          <Badge borderRadius="full" px="2" className={styles.user__badge}>
            New
          </Badge>
        ) : null}
        <Avatar
          onClick={onOpenProfileModal}
          title={username}
          className={styles.user__avatar}
          name={username}
          src={profile?.photoURL ?? ""}
        />
      </div>
      <h1
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
      >
        @{username}
      </h1>
      <h2>
        {userBirthdayObject(profile?.bday).age} <span>years</span>
      </h2>
      <p>
        Birthday {userBirthdayObject(profile?.bday).formattedBirthday} &bull;{" "}
        {profile?.gender}
      </p>
      <div className={styles.user__buttons}>
        <Button
          onClick={async () => {
            await followUser();
          }}
          isLoading={following}
          disabled={ignoring}
        >
          Add
        </Button>
        <Button
          onClick={async () => {
            await ignoreUser();
          }}
          isLoading={ignoring}
          disabled={following}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default User;
