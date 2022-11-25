import { Avatar, Button, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  TodaysBirthDaysDocument,
  useIgnoreBirthdayMutation,
  User,
  UsersBelatedBirthdaysDocument,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { userBirthdayObject } from "../../utils";
import CardsModal from "../CardsModal/CardsModal";
import Drops from "../Drops/Drops";
import styles from "./Card.module.css";
interface Props {
  user: User;
}
const Card: React.FC<Props> = ({ user: { profile, ...user } }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ignore, { loading }] = useIgnoreBirthdayMutation({
    fetchPolicy: "network-only",
  });

  const ignoreBirthday = async () => {
    await ignore({
      variables: {
        input: {
          accessToken: getAccessToken(),
          friendUsername: user.username,
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
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${profile?.bannerURL})`,
      }}
    >
      <CardsModal
        isOpen={isOpen}
        onClose={onClose}
        user={
          {
            ...user,
            profile: {
              ...profile,
            } as any,
          } as any
        }
      />
      <Drops>
        <div className={styles.card__container}>
          <div className={styles.card__top}>
            <h1
              onClick={() => {
                router.push(`/profile/${user.id}`);
              }}
            >
              {user.username} • {profile?.gender} •{" "}
              {userBirthdayObject(profile?.bday).formattedBirthday}
            </h1>
          </div>
          <div className={styles.card__center}>
            <Avatar
              title={user?.username}
              className={styles.card__avatar}
              name={user?.username}
              src={profile?.photoURL ?? ""}
            />
          </div>
          <h3>
            {userBirthdayObject(profile?.bday).age} <span>years</span>
          </h3>
          <div className={styles.card__bottom}>
            <Button onClick={onOpen} disabled={loading}>
              SEND WISH
            </Button>
            <Button onClick={ignoreBirthday} isLoading={loading}>
              IGNORE
            </Button>
          </div>
          <div className={styles.card__bio}>
            <p>
              Send birthday card to{" "}
              <Link href={`/profile/${user.id}`}>{profile?.username}</Link>{" "}
              {profile?.gender === "male" ? "he" : "she"} just turned{" "}
              <strong>{userBirthdayObject(profile?.bday).age} </strong>{" "}
              recently.
            </p>
          </div>
        </div>
      </Drops>
    </div>
  );
};

export default Card;
