import { Button, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import { NotificationsSettings } from "../../graphql/generated/graphql";
import styles from "./NotificationSettings.module.css";
interface Props {
  settings: NotificationsSettings;
}
const NotificationSettings: React.FC<Props> = ({ settings }) => {
  const [newUser, setNewUser] = useState(0);
  const [newFollower, setNewFollower] = useState(0);
  const [newFriend, setNewFriend] = useState(0);
  const [friendBirthday, setFriendBirthday] = useState(0);
  const [friendProfileUpdate, setFriendProfileUpdate] = useState(0);
  const [onBirthdayWish, setOnBirthdayWish] = useState(0);

  React.useEffect(() => {
    if (settings) {
      setNewUser(settings.onNewUserAccountCreation ? 1 : 0);
      setNewFollower(settings.onNewFollowers ? 1 : 0);
      setNewFriend(settings.onNewFriends ? 1 : 0);
      setFriendBirthday(settings.onFriendBirthday ? 1 : 0);
      setFriendProfileUpdate(settings.onFriendProfileUpdate ? 1 : 0);
      setOnBirthdayWish(settings.onBirthDayWish ? 1 : 0);
    }
  }, [settings]);
  return (
    <form className={styles.notification__settings}>
      <h1>Manage your Notifications</h1>
      <div>
        <p>Notify me when new user create account.</p>
        <Switch
          value={newUser}
          isChecked={!!newUser}
          onChange={(e) => {
            if (e.target.checked) {
              setNewUser(1);
            } else {
              setNewUser(0);
            }
          }}
        />
      </div>
      <div>
        <p>Notify me on new followers.</p>
        <Switch
          value={newFollower}
          isChecked={!!newFollower}
          onChange={(e) => {
            if (e.target.checked) {
              setNewFollower(1);
            } else {
              setNewFollower(0);
            }
          }}
        />
      </div>
      <div>
        <p>Notify me on new friends.</p>
        <Switch
          value={newFriend}
          isChecked={!!newFriend}
          onChange={(e) => {
            if (e.target.checked) {
              setNewFriend(1);
            } else {
              setNewFriend(0);
            }
          }}
        />
      </div>
      <div>
        <p>Notify me on friends birthday.</p>
        <Switch
          value={friendBirthday}
          isChecked={!!friendBirthday}
          onChange={(e) => {
            if (e.target.checked) {
              setFriendBirthday(1);
            } else {
              setFriendBirthday(0);
            }
          }}
        />
      </div>
      <div>
        <p>Notify me on friends new profile update.</p>
        <Switch
          value={friendProfileUpdate}
          isChecked={!!friendProfileUpdate}
          onChange={(e) => {
            if (e.target.checked) {
              setFriendProfileUpdate(1);
            } else {
              setFriendProfileUpdate(0);
            }
          }}
        />
      </div>
      <div>
        <p>Notify me when someone wishes me happy birthday.</p>
        <Switch
          value={onBirthdayWish}
          isChecked={!!onBirthdayWish}
          onChange={(e) => {
            if (e.target.checked) {
              setOnBirthdayWish(1);
            } else {
              setOnBirthdayWish(0);
            }
          }}
        />
      </div>
      <Button>Save Changes</Button>
      <p>
        Changing your notification settings will help you to filter out un
        necessary notifications and alerts.
      </p>
    </form>
  );
};

export default NotificationSettings;