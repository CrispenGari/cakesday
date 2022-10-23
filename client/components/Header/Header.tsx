import React from "react";
import styles from "./Header.module.css";
import { Image } from "@chakra-ui/react";
import { AiFillSetting, AiFillBell } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { HeaderIconButton } from "../../components";
interface Props {}

const Header: React.FC<Props> = ({}) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Image src="/header-logo.png" alt="header-logo" />
      </div>
      <div className={styles.header__right}>
        <HeaderIconButton title="settings" Icon={AiFillSetting} />
        <HeaderIconButton title="notifications" Icon={AiFillBell} />
        <div className={styles.header__right__profile}>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </div>
      </div>
    </div>
  );
};

export default Header;
