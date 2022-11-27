import { Button, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FreeCardType } from "../../../constants";
import {
  TodaysBirthDaysDocument,
  User,
  UsersBelatedBirthdaysDocument,
  useSendBirthdayCardMutation,
} from "../../../graphql/generated/graphql";
import { getAccessToken } from "../../../state";
import { StateType } from "../../../types";
import Drops from "../../Drops/Drops";
import styles from "./FreeBirthdayCard.module.css";
interface Props {
  card: FreeCardType;
  user: User;
  onClose: () => void;
}
const FreeBirthdayCard: React.FC<Props> = ({
  card: { imagePath, cardType },
  user,
  onClose,
}) => {
  const theme = useSelector(({ theme }: StateType) => theme);
  const [message, setMessage] = useState(`Happy birthday ${user.username}!!`);
  const [sendCard, { loading, data }] = useSendBirthdayCardMutation({
    fetchPolicy: "network-only",
  });

  const sendWish = async () => {
    await sendCard({
      variables: {
        input: {
          accessToken: getAccessToken(),
          friendUsername: user.username,
          message,
          bdayCard: cardType,
        },
      },
      refetchQueries: [
        {
          query: TodaysBirthDaysDocument,
          variables: {},
          fetchPolicy: "network-only",
        },
        {
          query: UsersBelatedBirthdaysDocument,
          variables: {},
          fetchPolicy: "network-only",
        },
      ],
    });
  };
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.sendWish) {
      onClose();
    }
    return () => {
      mounted = false;
    };
  }, [data, onClose]);

  return (
    <div
      className={theme === "dark" ? styles.free__card__dark : styles.free__card}
    >
      <div className={styles.free__card__preview}>
        <Drops>
          <Image
            alt="card"
            src={imagePath}
            className={styles.free__card__preview__image}
          />
        </Drops>
        <h1>
          {message.split("").map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </h1>
      </div>
      <div className={styles.free__card__buttons}>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder={`message for ${user.username}`}
        ></textarea>
        <Button isLoading={loading} onClick={sendWish}>
          Send Wish
        </Button>
      </div>
    </div>
  );
};

export default FreeBirthdayCard;
