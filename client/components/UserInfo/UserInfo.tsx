import { Badge, Button } from "@chakra-ui/react";
import React from "react";
import {
  useFollowUserMutation,
  MeDocument,
  FriendsSuggestionsDocument,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { UserType } from "../../types";
import { unixTimeStampToObject, userBirthdayObject } from "../../utils";
import styles from "./UserInfo.module.css";
interface Props {
  user: UserType;
  isMe: boolean;
}
const UserInfo: React.FC<Props> = ({ user, isMe }) => {
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
        friendUsername: user?.username,
      },
    },
  });
  return (
    <div className={styles.user__info}>
      {isMe ? null : (
        <Badge borderRadius="full" px="2" className={styles.user__info__badge}>
          New
        </Badge>
      )}
      <h1>
        {user?.username} &bull; {user?.profile?.gender}
      </h1>
      <h2>
        Birthday {userBirthdayObject(user?.profile?.bday).formattedBirthday}
      </h2>

      <h3>
        {userBirthdayObject(user?.profile?.bday).age} <span>years</span>
      </h3>
      <p>{user?.profile?.bio}</p>
      <h5>
        <span>{user?.followers?.length} followers</span>
        &bull;
        <span>{user?.followings?.length} followings</span>
        &bull;
        <span>{user?.friends?.length} friends</span>
      </h5>
      <div>
        <p>
          created at: {unixTimeStampToObject(user?.createdAt)?.formattedDate}
        </p>
        <p>
          last updated at:{" "}
          {unixTimeStampToObject(user?.updatedAt)?.formattedDate}
        </p>
      </div>
      {isMe ? null : (
        <Button
          isLoading={loading}
          onClick={async () => {
            await followUser();
          }}
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default UserInfo;
