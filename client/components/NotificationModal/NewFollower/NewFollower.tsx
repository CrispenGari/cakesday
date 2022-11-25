import { Button, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  FriendsSuggestionsDocument,
  MeDocument,
  Notification,
  useFollowUserMutation,
} from "../../../graphql/generated/graphql";
import { getAccessToken } from "../../../state";
import { userBirthdayObject } from "../../../utils";
import styles from "./NewFollower.module.css";
interface Props {
  notification: Notification;
  onClose: () => void;
}
const NewFollower: React.FC<Props> = ({ notification, onClose }) => {
  const router = useRouter();
  const [followUser, { loading, data }] = useFollowUserMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: MeDocument, variables: {}, fetchPolicy: "network-only" },
      {
        query: FriendsSuggestionsDocument,
        fetchPolicy: "network-only",
        variables: {
          input: {
            accessToken: getAccessToken(),
          },
        },
      },
    ],
  });

  const followUserHandler = async (username: string): Promise<void> => {
    await followUser({
      variables: {
        input: {
          accessToken: getAccessToken(),
          friendUsername: username,
        },
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (data?.followUser.success) {
        onClose();
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, onClose]);
  return (
    <div className={styles.new__follower}>
      <h1>{notification.message}</h1>
      <div className={styles.new__follower__user}>
        <Avatar
          onClick={() => {
            router.push(`/profile/${notification.fromId}`);
          }}
          title={notification.fromUsername}
          className={styles.new__follower__user__avatar}
          name={notification.fromUsername}
          src={notification.fromPhotoURL ?? ""}
        />
        <div className={styles.new__follower__user__info}>
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
        </div>
      </div>
      <Button
        isLoading={loading}
        onClick={() => followUserHandler(notification.fromUsername)}
      >
        follow back
      </Button>
    </div>
  );
};

export default NewFollower;
