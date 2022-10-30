import { Switch, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { privacyOptions, privacyprivacyOptions } from "../../constants";
import styles from "./PrivacySettings.module.css";
interface Props {}

const PrivacySettings: React.FC<Props> = ({}) => {
  const [myBday, setMyBday] = useState("everyone");
  const [myBdayWishes, setMyBdayWishes] = useState("everyone");
  const [seeFollowers, setSeeFollowers] = useState("everyone");
  const [sendBdayCard, setSendBdayCard] = useState("friends");
  return (
    <form className={styles.privacy__settings}>
      <h1>Manage your Privacy</h1>
      <div>
        <p>Who will see my birthday?</p>
        <select value={myBday} onChange={(e) => setMyBday(e.target.value)}>
          {privacyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Who will send me birthday wishes?</p>
        <select
          value={myBdayWishes}
          onChange={(e) => setMyBdayWishes(e.target.value)}
        >
          {privacyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Who will see my followers, friend and followings?</p>
        <select
          value={seeFollowers}
          onChange={(e) => setSeeFollowers(e.target.value)}
        >
          {privacyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Who can share my birthday card?</p>
        <select
          value={sendBdayCard}
          onChange={(e) => setSendBdayCard(e.target.value)}
        >
          {privacyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <Button>Save Changes</Button>
      <p>
        Managing your privacy is changing the visibility of your information to
        the other users of cakesday.
      </p>
    </form>
  );
};

export default PrivacySettings;
