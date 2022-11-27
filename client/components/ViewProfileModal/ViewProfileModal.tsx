import { Modal, ModalContent, Button, Image } from "@chakra-ui/react";

import React from "react";
import { useSelector } from "react-redux";
import { Profile } from "../../graphql/generated/graphql";
import { StateType } from "../../types";

import styles from "./ViewProfileModal.module.css";
interface Props {
  onClose: () => void;
  isOpen: boolean;
  profile: Profile;
  imageType: "banner" | "avatar";
}
const ViewProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  imageType,
}) => {
  const theme = useSelector(({ theme }: StateType) => theme);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        className={
          theme === "dark"
            ? styles.view__profile__modal__dark
            : styles.view__profile__modal
        }
      >
        <h1>{`${profile?.username}'s ${imageType} image.`}</h1>
        {imageType === "avatar" ? (
          profile?.photoURL ? (
            <Image alt="profile" src={profile?.photoURL} />
          ) : (
            <div>No profile avatar for {profile?.username}.</div>
          )
        ) : profile?.bannerURL ? (
          <Image alt="profile" src={profile.bannerURL} />
        ) : (
          <div>No banner for {profile.username}.</div>
        )}
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default ViewProfileModal;
