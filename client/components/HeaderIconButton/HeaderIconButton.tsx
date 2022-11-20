import React from "react";
import { IconType } from "react-icons";
import styles from "./HeaderIconButton.module.css";
interface Props {
  title: string;
  onClick?: () => void;
  Icon: IconType;
  dot?: boolean;
  content?: number;
}
const HeaderIconButton: React.FC<Props> = ({
  title,
  onClick,
  Icon,
  dot,
  content,
}) => {
  return (
    <div className={styles.header__icon__btn} title={title} onClick={onClick}>
      <Icon className={styles.header__icon__btn__icon} />
      <h1>{title}</h1>
      {content && content > 0 ? (
        <div className={styles.header__icon__btn__badge}>{`${
          content >= 10 ? "9+" : content
        }`}</div>
      ) : null}
      {dot && <div className={styles.header__icon__btn__badge__dot}></div>}
    </div>
  );
};
export default HeaderIconButton;
