import React from "react";
import { IconType } from "react-icons";
import styles from "./HeaderIconButton.module.css";
interface Props {
  title: string;
  onClick?: () => void;
  Icon: IconType;
}
const HeaderIconButton: React.FC<Props> = ({ title, onClick, Icon }) => {
  return (
    <div className={styles.header__icon__btn} title={title} onClick={onClick}>
      <Icon className={styles.header__icon__btn__icon} />
      <h1>{title}</h1>
    </div>
  );
};
export default HeaderIconButton;
