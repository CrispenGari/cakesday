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
import { setNotifications, setTheme } from "../../actions";
import { StateType } from "../../types";
import { ColorThemes } from "../../constants";
interface Props {}
const Header: React.FC<Props> = ({}) => {
  const { notifications } = useSelector((state: StateType) => state);
  const { data: me } = useMeQuery({
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
    if (mounted && notification?.newNotification?.user.id === me?.me?.id) {
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
  }, [notification, dispatch, me]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (me?.me?.settings?.common?.theme) {
        dispatch(setTheme(me.me.settings.common.theme as any));
      }
    }
    return () => {
      mounted = false;
    };
  }, [me, dispatch]);

  return (
    <div
      className={styles.header}
      style={{
        backgroundColor:
          me?.me?.settings?.common?.theme === "dark"
            ? ColorThemes.DARK_MAIN
            : ColorThemes.LIGHT_MAIN,
      }}
    >
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
            router.push(`/profile/${me?.me?.id}`);
          }}
        >
          <Avatar
            className={styles.sidebar__right__top__avatar}
            name={me?.me?.username}
            src={me?.me?.profile?.photoURL ?? ""}
            title={`profile/@${me?.me?.username}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
