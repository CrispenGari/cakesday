import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  FriendsSuggestionsDocument,
  MeDocument,
  useFollowUserMutation,
  useMeQuery,
  useTodaysBirthDaysQuery,
  useUsersBelatedBirthdaysQuery,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import CardsModal from "../CardsModal/CardsModal";
import FlatUser from "../FlatUser/FlatUser";
import styles from "./SideBarLeft.module.css";
interface Props {}
const SideBarLeft: React.FC<Props> = ({}) => {
  const { data: me } = useMeQuery({ fetchPolicy: "network-only" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const { data: belatedBdays } = useUsersBelatedBirthdaysQuery({
    fetchPolicy: "network-only",
  });
  const { data: todaysBirthdays } = useTodaysBirthDaysQuery({
    fetchPolicy: "network-only",
  });

  const [followUser, { loading }] = useFollowUserMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: MeDocument, variables: {}, fetchPolicy: "network-only" },
      {
        query: FriendsSuggestionsDocument,
        fetchPolicy: "network-only",
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });

  const followUserHandler = async (username: string): Promise<void> => {
    await followUser({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          friendUsername: username,
        },
      },
    });
  };

  return (
    <div className={styles.sidebar__left}>
      <h1>Birthdays</h1>
      {selectedUser && (
        <CardsModal isOpen={isOpen} onClose={onClose} user={selectedUser} />
      )}

      <div className={styles.sidebar__left__lists}>
        <p>
          <span>Today</span> <span></span>
        </p>
        {todaysBirthdays?.usersBirthday?.map((user) => (
          <FlatUser
            key={user.id}
            user={user.profile as any}
            btnTitle={"Send Wish"}
            size="small"
            color="secondary"
            onBtnClick={() => {
              setSelectedUser(user);
              if (!!selectedUser) {
                onOpen();
              }
            }}
          />
        ))}
        <p>
          <span>Belated</span> <span></span>
        </p>
        {belatedBdays?.usersBelatedBirthdays?.map((user) => (
          <FlatUser
            key={user.id}
            user={user.profile as any}
            btnTitle={"Send Wish"}
            size="small"
            color="secondary"
            onBtnClick={() => {
              setSelectedUser(user);
              if (!!selectedUser) {
                onOpen();
              }
            }}
          />
        ))}
      </div>
      <h1>Who follows you?</h1>
      <div className={styles.sidebar__left__lists}>
        {me?.me
          ?.followers!.filter(
            (follower) =>
              me.me?.followings
                ?.map((f) => f.username)
                .indexOf(follower.username) === -1
          )
          .map((follower) => (
            <FlatUser
              key={follower.id}
              user={follower as any}
              btnTitle={"follow back"}
              size="small"
              color="secondary"
              onBtnClick={() => followUserHandler(follower.username)}
              loading={loading}
            />
          ))}
      </div>
    </div>
  );
};

export default SideBarLeft;
