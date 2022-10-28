import React from "react";
import { Header } from "../components";
import styles from "../styles/Notifications.module.css";
interface Props {}
const Notifications: React.FC<Props> = ({}) => {
  return (
    <div className={styles.notifications}>
      <Header />
      <div className={styles.notifications__main}>
        <h1>notifications Main</h1>
        {/* Banner */}
        {/* Info */}
        {/* SignOutButton */}
      </div>
    </div>
  );
};

export default Notifications;
