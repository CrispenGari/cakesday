import { Button, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./NotificationSettings.module.css";
interface Props {}
const NotificationSettings: React.FC<Props> = ({}) => {
  const [newUser, setNewUser] = useState(0);
  const [newFollower, setNewFollower] = useState(0);
  const [newFriend, setNewFriend] = useState(0);
  const [friendBirthday, setFriendBirthday] = useState(0);
  const [friendProfileUpdate, setFriendProfileUpdate] = useState(0);
  return (
    <form className={styles.notification__settings}>
      <h1>Manage your Notifications</h1>
      <div>
        <p>Notify me when new user create account.</p>
        <Switch
          value={newUser}
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
          onChange={(e) => {
            if (e.target.checked) {
              setFriendProfileUpdate(1);
            } else {
              setFriendProfileUpdate(0);
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
