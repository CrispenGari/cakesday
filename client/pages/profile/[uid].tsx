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

  const { data } = useUserByIdQuery({
    variables: {
      input: { id: Number.parseInt(router.query.uid as any) },
    },
    fetchPolicy: "network-only",
  });
  const { data: me } = useMeQuery({ fetchPolicy: "network-only" });
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
        btnTitle="follow back"
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
        btnTitle="unfollow"
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
        />
        <SignOutButton profile={me?.me?.profile as any} />
      </div>
    </div>
  );
};

export default Profile;
