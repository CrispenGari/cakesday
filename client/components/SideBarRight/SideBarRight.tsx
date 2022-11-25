import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useSignOutMutation,
  useMeQuery,
} from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import { userBirthdayObject } from "../../utils";
import styles from "./SideBarRight.module.css";

interface Props {}

const SideBarRight: React.FC<Props> = ({}) => {
  const [logout, { loading, data }] = useSignOutMutation({
    fetchPolicy: "network-only",
  });
  const { data: user } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const router = useRouter();
  const theme = useSelector(({ theme }: StateType) => theme);
  useEffect(() => {
    if (data?.signOut) {
      window.location.reload();
    }
  }, [router, data]);

  return (
    <div
      className={
        theme === "dark" ? styles.sidebar__right__dark : styles.sidebar__right
      }
    >
      <div className={styles.sidebar__right__top}>
        <h1
          onClick={() => {
            router.push(`/profile/${user?.me?.id}`);
          }}
        >
          @{user?.me?.username}
        </h1>
        <div
          className={styles.sidebar__right__banner}
          style={{
            backgroundImage: `url(${user?.me?.profile?.bannerURL})`,
          }}
        >
          <Avatar
            className={styles.sidebar__right__top__avatar}
            name={user?.me?.username}
            src={user?.me?.profile?.photoURL ?? ""}
          />
        </div>
        <Button
          onClick={() => {
            router.push(`/profile/${user?.me?.id}`);
          }}
        >
          Profile
        </Button>
        <h2>
          Birthday{" "}
          {userBirthdayObject(user?.me?.profile?.bday).formattedBirthday}
        </h2>

        <h3>
          {userBirthdayObject(user?.me?.profile?.bday).age} <span>years</span>
        </h3>
      </div>

      <Button
        isLoading={loading}
        onClick={async () => {
          await logout({});
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SideBarRight;
