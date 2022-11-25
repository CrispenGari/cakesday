import { Modal, ModalContent, Button } from "@chakra-ui/react";
import React from "react";
import {
  Follower,
  FriendsSuggestionsDocument,
  MeDocument,
  Profile,
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import FlatUser from "../FlatUser/FlatUser";
import styles from "./ProfileModal.module.css";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  data: {
    isMe: boolean;
    title: string;
    username: string;
    users: Profile[] | Follower[];
  };
  btnTitle: "unfollow" | "follow" | "unfriend" | "follow back";
}
const ProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data: { title, isMe, username, users },
  btnTitle,
}) => {
  const [unFollowUser, { loading }] = useUnFollowUserMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: MeDocument, variables: {}, fetchPolicy: "network-only" },
      {
        query: FriendsSuggestionsDocument,
        fetchPolicy: "network-only",
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });
  const [followUser, { loading: loading0 }] = useFollowUserMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: MeDocument, variables: {}, fetchPolicy: "network-only" },
      {
        query: FriendsSuggestionsDocument,
        fetchPolicy: "network-only",
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });

  const handleEvent = async (username: string): Promise<void> => {
    if (btnTitle === "follow back" || btnTitle === "follow") {
      await followUser({
        variables: {
          input: {
            accessToken: getAccessToken() as any,
            friendUsername: username,
          },
        },
      });
    } else {
      await unFollowUser({
        variables: {
          input: {
            accessToken: getAccessToken() as any,
            friendUsername: username,
          },
        },
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className={styles.profile__modal__content}>
        <h1>{`${isMe ? "Your " : username} ${title}`}</h1>

        {users.length === 0 ? (
          <div className={styles.profile__modal__content__empty}>
            No {title}.
          </div>
        ) : (
          <div className={styles.profile__modal__content__container}>
            {users.map((user) => (
              <FlatUser
                color="primary"
                size="normal"
                key={user.id}
                user={user}
                btnTitle={btnTitle}
                onBtnClick={() => handleEvent(user.username)}
                loading={loading || loading0}
              />
            ))}
          </div>
        )}
        <Button onClick={onClose} disabled={loading || loading0}>
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
