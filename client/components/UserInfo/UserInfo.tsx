import { Avatar, Badge, Button } from "@chakra-ui/react";
import React from "react";
import {
  useFollowUserMutation,
  MeDocument,
  FriendsSuggestionsDocument,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { UserType } from "../../types";
import {
  dateDiffFromToday,
  unixTimeStampToObject,
  userBirthdayObject,
} from "../../utils";
import BirthdayToday from "../BirthdayToday/BirthdayToday";
import CardsModal from "../CardsModal/CardsModal";
import Drops from "../Drops/Drops";
import styles from "./UserInfo.module.css";
interface Props {
  user: UserType;
  isMe: boolean;
  openFollowings: () => void;
  openFollowers: () => void;
}
const UserInfo: React.FC<Props> = ({
  user,
  isMe,
  openFollowers,
  openFollowings,
}) => {
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
      {!userBirthdayObject(user?.profile?.bday).isBirthday ? (
        <BirthdayToday user={user} isMe={isMe} />
      ) : null}

      <div className={styles.user__info__container}>
        {isMe ? null : dateDiffFromToday(new Date(Number(user?.createdAt)))
            .isNew ? (
          <Badge
            borderRadius="full"
            px="2"
            className={styles.user__info__badge}
          >
            New
          </Badge>
        ) : (
          <Badge
            borderRadius="full"
            px="2"
            className={styles.user__info__badge}
          >
            Old
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
          <span onClick={() => openFollowers()}>
            {user?.followers?.length} followers
          </span>
          &bull;
          <span onClick={() => openFollowings()}>
            {user?.followings?.length} followings
          </span>
        </h5>
        {user?.followings?.length !== 0 ? <h4>{"TOP 10 FOLLOWINGS"}</h4> : null}
        <div className={styles.user__info__top__10}>
          {user?.followings?.slice(0, 10)?.map(({ photoURL, username, id }) => (
            <Avatar
              name={username}
              key={id}
              src={photoURL}
              title={`@${username}`}
              className={styles.user__info__avatar}
            />
          ))}
        </div>
        <div>
          <p>
            joined at: {unixTimeStampToObject(user?.createdAt)?.formattedDate}
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
    </div>
  );
};

export default UserInfo;
