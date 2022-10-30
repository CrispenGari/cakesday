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
import { useMeQuery } from "../graphql/generated/graphql";
import styles from "../styles/Settings.module.css";
interface Props {}
const Settings: React.FC<Props> = ({}) => {
  const { loading, data: me } = useMeQuery({ fetchPolicy: "network-only" });
  console.log(me);
  return (
    <div className={styles.settings}>
      <Header />
      <div className={styles.settings__main}>
        <h1>Common Settings</h1>
        {/* changing the theme */}
        <ChangeThemeSettings settings={me?.me?.settings?.common as any} />
        <CakesDayEmailSubscriptionsSettings
          settings={me?.me?.settings?.common as any}
        />
        <h1>Notification Settings</h1>
        <NotificationSettings
          settings={me?.me?.settings?.notifications as any}
        />
        <h1>Profile Settings</h1>
        {/* Changing the profile info */}
        <ProfileSettings profile={me?.me?.profile as any} />
        <h1>Privacy Settings</h1>
        <PrivacySettings settings={me?.me?.settings?.privacy as any} />
        {/* Changing Privacy */}
        <h1>Account Settings</h1>
        {/* ChangePassword */}
        <ChangePasswordSettings />
        {/* Invalidate Tokens */}
        <InvalidateTokensSettings />
        {/* Delete Account */}
        <DeleteAccountSettings />
        {/* Change Email */}
        <ChangeEmailSettings profile={me?.me?.profile as any} />
        {/* ForgotPasswordSettings */}
        <ForgotPasswordSettings profile={me?.me?.profile as any} />
      </div>
    </div>
  );
};

export default Settings;
