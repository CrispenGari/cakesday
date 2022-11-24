import {
  Avatar,
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { Emoji } from "@crispengari/react-emojify";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { freeCards, reactions } from "../../../constants";
import {
  MyNotificationsDocument,
  Notification,
  useReactToBirthDayCardMutation,
} from "../../../graphql/generated/graphql";
import { getAccessToken } from "../../../state";
import { NotificationType } from "../../../types";
import { emotions, userBirthdayObject } from "../../../utils";
import Drops from "../../Drops/Drops";
import styles from "./BirthDayCard.module.css";
interface Props {
  notification: Notification;
  onClose: () => void;
}
const BirthDayCard: React.FC<Props> = ({ notification, onClose }) => {
  const [openEmotions, setOpenEmotions] = useState(false);
  const [changed, setChanged] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(reactions[0]);

  const [react, { loading, data }] = useReactToBirthDayCardMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      {
        query: MyNotificationsDocument,
        fetchPolicy: "network-only",
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });
  const toast = useToast();
  const router = useRouter();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (!!data?.reactToCard) {
        setOpenEmotions(false);
        onClose();
        toast({
          title: "Card Reaction.",
          description: `You have reacted '${selectedEmotion.reaction}' to ${notification.fromUsername}'s birthday card.`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setChanged(false);
      }
    }
    return () => {
      mounted = false;
    };
  }, [toast, data, notification, selectedEmotion, onClose]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (notification.reaction) {
        setSelectedEmotion(
          reactions.find((em) => em.reaction === notification.reaction) ??
            reactions[0]
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [notification]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && changed) {
      (async () => {
        await react({
          variables: {
            input: {
              accessToken: getAccessToken(),
              friendUsername: notification.fromUsername,
              notificationId: notification.id,
              reaction: selectedEmotion.reaction,
            },
          },
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [selectedEmotion, changed, notification, react]);
  const card = freeCards.find(
    (card) => card.cardType === notification.bdayCard
  )!;
  return (
    <div className={styles.birthday__card}>
      <h1>{notification.message}</h1>
      <div className={styles.birthday__card__container}>
        <div className={styles.birthday__card__preview}>
          <Drops>
            <Image
              alt="card"
              src={card?.imagePath}
              className={styles.birthday__card__preview__image}
            />
          </Drops>
          <h1>
            {notification?.bdayMessage?.split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h1>
        </div>
        <div className={styles.birthday__card__buttons}>
          <p>{`"${notification?.bdayMessage}!"`}</p>
          <Button
            title={
              notification.type === NotificationType.BIRTHDAY_CARD
                ? "react"
                : notification.reaction?.toLocaleLowerCase()
            }
            isLoading={loading}
            disabled={notification.type !== NotificationType.BIRTHDAY_CARD}
            onClick={() => {
              setOpenEmotions(true);
            }}
          >
            <Emoji emojiId={selectedEmotion.emojiId} />
          </Button>
          {openEmotions ? (
            <div className={styles.birthday__card__reactions}>
              {reactions.map((reaction) => (
                <Button
                  isLoading={loading}
                  onClick={() => {
                    setSelectedEmotion(reaction);
                    setChanged(true);
                  }}
                  key={reaction.id}
                  className={
                    reaction.id === selectedEmotion.id
                      ? reaction.id % 2 === 0
                        ? styles.birthday__card__reaction__even
                        : styles.birthday__card__reaction__odd
                      : styles.p
                  }
                  title={reaction.reaction.split(" ").join(" ").toLowerCase()}
                >
                  <Emoji emojiId={reaction.emojiId} />
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.birthday_card__user}>
        <Avatar
          onClick={() => {
            router.push(`/profile/${notification.fromId}`);
          }}
          title={notification.fromUsername}
          className={styles.birthday_card__user__avatar}
          name={notification.fromUsername}
          src={notification.fromPhotoURL ?? ""}
        />
        <div className={styles.birthday_card__user__info}>
          <h1
            onClick={() => {
              router.push(`/profile/${notification.fromId}`);
            }}
          >
            {notification.fromUsername}
          </h1>
          <p>
            {notification.fromGender} &bull;{" "}
            {userBirthdayObject(notification.fromBDay).formattedBirthday}
            {` • ${userBirthdayObject(notification.fromBDay).age}years`}
          </p>
          <Button
            onClick={() => {
              router.push(`/profile/${notification.fromId}`);
            }}
          >
            Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BirthDayCard;
