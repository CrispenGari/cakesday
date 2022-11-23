import { Button, Image } from "@chakra-ui/react";
import React from "react";
import { FreeCardType } from "../../../constants";
import { User } from "../../../graphql/generated/graphql";
import Drops from "../../Drops/Drops";
import styles from "./FreeBirthdayCard.module.css";
interface Props {
  card: FreeCardType;
  user: User;
}
const FreeBirthdayCard: React.FC<Props> = ({ card: { imagePath }, user }) => {
  return (
    <div className={styles.free__card}>
      <div className={styles.free__card__preview}>
        <Drops>
          <Image
            alt="card"
            src={imagePath}
            className={styles.free__card__preview__image}
          />
        </Drops>
      </div>
      <div className={styles.free__card__buttons}>
        <Button>Send Wish</Button>
      </div>
    </div>
  );
};

export default FreeBirthdayCard;
