import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Notification } from "../../graphql/generated/graphql";

import NotificationModal from "../NotificationModal/NotificationModal";
import styles from "./Notification.module.css";
import moment from "moment";
import { unixTimeStampToObject } from "../../utils";
interface Props {
  notification: Notification;
}
const Notification: React.FC<Props> = ({
  notification: { user, ...notification },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      className={styles.notification}
      style={{
        background: notification.read ? "white" : "#ef8c86",
        color: notification.read ? "black" : "white",
      }}
      onClick={async () => {
        await onOpen();
      }}
    >
      <NotificationModal
        isOpen={isOpen}
        notification={{
          user,
          ...notification,
        }}
        onClose={onClose}
      />
      <h1>{notification.type.split("_").join(" ")}</h1>{" "}
      {/* Notification Type  */}
      <p>
        {/* message and time */}
        <span>{notification.message}</span>
        <span>
          {moment(
            unixTimeStampToObject(notification.createdAt).moment,
            "YYYYMMDD"
          ).fromNow()}
        </span>
      </p>
    </div>
  );
};

export default Notification;
