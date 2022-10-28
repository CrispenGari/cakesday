import React from "react";
import styles from "./User.module.css";
import { Box, Image, Badge, Button, Avatar } from "@chakra-ui/react";
import { UserType } from "../../types";
import { userBirthdayObject } from "../../utils";
import { useRouter } from "next/router";
import {
  FriendsSuggestionsDocument,
  MeDocument,
  useFollowUserMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
interface Props {
  friend: UserType;
}
const User: React.FC<Props> = ({
  friend: { profile, followers, followings, username, id, friends },
}) => {
  const router = useRouter();
  const [followUser, { data, loading }] = useFollowUserMutation({
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
    <div className={styles.user}>
      <div
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
        className={styles.user__banner}
        style={{
          backgroundImage: `url(${profile?.bannerURL})`,
        }}
      >
        <Badge borderRadius="full" px="2" className={styles.user__badge}>
          New
        </Badge>
        <Avatar
          onClick={() => {
            router.push(`/profile/${id}`);
          }}
          title={username}
          className={styles.user__avatar}
          name={username}
          src={profile?.photoURL}
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
      <h5>
        <span>{followers?.length} followers</span>
        &bull;
        <span>{followings?.length} followings</span>
        &bull;
        <span>{friends?.length} friends</span>
      </h5>
      <div className={styles.user__buttons}>
        <Button
          onClick={async () => {
            await followUser();
          }}
          isLoading={loading}
        >
          Add
        </Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
};

export default User;
