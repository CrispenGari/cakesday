import React from "react";
import styles from "./Header.module.css";
import { Image } from "@chakra-ui/react";
import { AiFillSetting, AiFillBell } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { HeaderIconButton } from "../../components";
import { useMeQuery } from "../../graphql/generated/graphql";
import { useRouter } from "next/router";
interface Props {}

const Header: React.FC<Props> = ({}) => {
  const { loading: userLoading, data: user } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const router = useRouter();
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
        />
        <HeaderIconButton
          title="notifications"
          Icon={AiFillBell}
          onClick={() => {
            router.push(`/notifications`);
          }}
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
