import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Banner, Header, UserInfo, SignOutButton } from "../../components";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import { useMeQuery, useUserByIdQuery } from "../../graphql/generated/graphql";
import styles from "../../styles/ProfilePage.module.css";
interface Props {}
const Profile: React.FC<Props> = ({}) => {
  const router = useRouter();
  const {
    isOpen: isOpenFollowers,
    onOpen: openFollowers,
    onClose: onCloseFollowers,
  } = useDisclosure();
  const {
    isOpen: isOpenFollowings,
    onOpen: openFollowings,
    onClose: onCloseFollowings,
  } = useDisclosure();
  const {
    isOpen: isOpenFriends,
    onOpen: openFriends,
    onClose: onCloseFriends,
  } = useDisclosure();

  const { loading, data } = useUserByIdQuery({
    variables: {
      input: { id: Number.parseInt(router.query.uid as any) },
    },
    fetchPolicy: "network-only",
  });

  const { data: me } = useMeQuery({ fetchPolicy: "network-only" });
  console.log(me);
  return (
    <div className={styles.profile}>
      <Header />

      <ProfileModal
        isOpen={isOpenFollowers}
        onClose={onCloseFollowers}
        data={{
          isMe: me?.me?.username === data?.user?.username,
          title: "Followers",
          username: data?.user?.username ?? "",
          users: (me?.me?.followers as any) ?? [],
        }}
      />
      <ProfileModal
        isOpen={isOpenFollowings}
        onClose={onCloseFollowings}
        data={{
          isMe: me?.me?.username === data?.user?.username,
          title: "followings",
          username: data?.user?.username ?? "",
          users: (me?.me?.followings as any) ?? [],
        }}
      />
      <ProfileModal
        isOpen={isOpenFriends}
        onClose={onCloseFriends}
        data={{
          isMe: me?.me?.username === data?.user?.username,
          title: "Friends",
          username: data?.user?.username as any,
          users: (me?.me?.friends as any) ?? [],
        }}
      />

      <div className={styles.profile__main}>
        <Banner
          profile={data?.user?.profile as any}
          isMe={me?.me?.username === data?.user?.username}
        />
        <UserInfo
          user={data?.user as any}
          isMe={me?.me?.username === data?.user?.username}
          openFollowings={openFollowings}
          openFollowers={openFollowers}
          openFriends={openFriends}
        />
        <SignOutButton profile={me?.me?.profile as any} />
      </div>
    </div>
  );
};

export default Profile;
