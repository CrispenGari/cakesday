import React from "react";
import styles from "./Header.module.css";
import { Image } from "@chakra-ui/react";
import { AiFillSetting, AiFillBell } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { HeaderIconButton } from "../../components";
import { useUserQuery } from "../../graphql/generated/graphql";
interface Props {}

const Header: React.FC<Props> = ({}) => {
  const { loading: userLoading, data: user } = useUserQuery({
    fetchPolicy: "network-only",
  });
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Image src="/header-logo.png" alt="header-logo" />
      </div>
      <div className={styles.header__right}>
        <HeaderIconButton title="settings" Icon={AiFillSetting} />
        <HeaderIconButton title="notifications" Icon={AiFillBell} />
        <div className={styles.header__right__profile}>
          <Avatar
            className={styles.sidebar__right__top__avatar}
            name={user?.user?.username}
            src={user?.user?.profile?.photoURL ?? ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
