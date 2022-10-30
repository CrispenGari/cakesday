import React from "react";
import {
  DeleteAccountSettings,
  ChangePasswordSettings,
  ChangeEmailSettings,
  ChangeThemeSettings,
  ForgotPasswordSettings,
  Header,
  InvalidateTokensSettings,
  NotificationSettings,
  CakesDayEmailSubscriptionsSettings,
  PrivacySettings,
  ProfileSettings,
} from "../components";
import styles from "../styles/Settings.module.css";
interface Props {}
const Settings: React.FC<Props> = ({}) => {
  return (
    <div className={styles.settings}>
      <Header />
      <div className={styles.settings__main}>
        <h1>Common Settings</h1>
        {/* changing the theme */}
        <ChangeThemeSettings />
        <CakesDayEmailSubscriptionsSettings />
        <h1>Notification Settings</h1>
        <NotificationSettings />
        <h1>Profile Settings</h1>
        {/* Changing the profile info */}
        <ProfileSettings />
        <h1>Privacy Settings</h1>
        <PrivacySettings />
        {/* Changing Privacy */}
        <h1>Account Settings</h1>
        {/* ChangePassword */}
        <ChangePasswordSettings />
        {/* Invalidate Tokens */}
        <InvalidateTokensSettings />
        {/* Delete Account */}
        <DeleteAccountSettings />
        {/* Change Email */}
        <ChangeEmailSettings />
        {/* ForgotPasswordSettings */}
        <ForgotPasswordSettings />
      </div>
    </div>
  );
};

export default Settings;
