import React from "react";
import styles from "./Header.module.css";
import { Image } from "@chakra-ui/react";
import { AiFillSetting, AiFillBell } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { HeaderIconButton } from "../../components";
import {
  MyNotificationsDocument,
  useMeQuery,
  useNotificationsSubscription,
} from "../../graphql/generated/graphql";
import { useRouter } from "next/router";
import { getAccessToken } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";
import { setNotifications } from "../../actions";
import { StateType } from "../../types";
interface Props {}
const Header: React.FC<Props> = ({}) => {
  const { notifications } = useSelector((state: StateType) => state);
  const { data: user } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const { data: notification } = useNotificationsSubscription({
    fetchPolicy: "network-only",
    variables: {
      input: {
        accessToken: getAccessToken() as any,
      },
    },
  });
  const router = useRouter();
  const dispatch = useDispatch();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && notification?.newNotification?.user.id === user?.me?.id) {
      // this notification belongs to me
      (async () => {
        const { data: notifications } = await client.query({
          query: MyNotificationsDocument,
          fetchPolicy: "network-only",
          variables: {
            input: {
              accessToken: getAccessToken() as any,
            },
          },
        });
        dispatch(setNotifications(notifications?.myNotifications));
      })();
    }

    return () => {
      mounted = false;
    };
  }, [notification, dispatch, user]);

  return (
    <div className={styles.header}>
      <div className={styles.header__left} onClick={() => router.push("/")}>
        <Image src="/header-logo.png" alt="header-logo" />
      </div>
      <div className={styles.header__right}>
        <HeaderIconButton
          title="settings"
          Icon={AiFillSetting}
          onClick={() => {
            router.push(`/settings`);
          }}
          active={router.pathname.includes("/settings")}
        />
        <HeaderIconButton
          title="notifications"
          Icon={AiFillBell}
          onClick={() => {
            router.push(`/notifications`);
          }}
          content={
            notifications.filter((notification) => !notification.read).length
          }
          active={router.pathname.includes("/notifications")}
        />
        <div
          className={styles.header__right__profile}
          onClick={() => {
            router.push(`/profile/${user?.me?.id}`);
          }}
        >
          <Avatar
            className={styles.sidebar__right__top__avatar}
            name={user?.me?.username}
            src={user?.me?.profile?.photoURL ?? ""}
            title={`profile/@${user?.me?.username}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
