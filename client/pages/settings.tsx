import React from "react";
import { Header } from "../components";
import styles from "../styles/Settings.module.css";
interface Props {}
const Settings: React.FC<Props> = ({}) => {
  return (
    <div className={styles.settings}>
      <Header />
      <div className={styles.settings__main}>
        <h1>settings Main</h1>
        {/* Banner */}
        {/* Info */}
        {/* SignOutButton */}
      </div>
    </div>
  );
};

export default Settings;
