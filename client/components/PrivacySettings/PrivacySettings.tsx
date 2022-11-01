import { Switch, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { privacyOptions } from "../../constants";
import {
  FriendsSuggestionsDocument,
  MeDocument,
  PrivacySettings,
  useUpdatePrivacySettingsMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import Submitting from "../Submitting/Submitting";
import styles from "./PrivacySettings.module.css";
interface Props {
  settings: PrivacySettings;
}

const PrivacySettings: React.FC<Props> = ({ settings }) => {
  const [myBday, setMyBday] = useState("everyone");
  const [myBdayWishes, setMyBdayWishes] = useState("everyone");
  const [seeFollowers, setSeeFollowers] = useState("everyone");
  const [sendBdayCard, setSendBdayCard] = useState("friends");
  const [myProfile, setMyProfile] = useState("everyone");

  const [counter, setCounter] = React.useState(5);
  const [error, setError] = React.useState("");
  const [updateSettings, { loading, data }] = useUpdatePrivacySettingsMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: MeDocument, variables: {} },
      {
        query: FriendsSuggestionsDocument,
        variables: {
          accessToken: getAccessToken() as any,
        },
      },
    ],
  });

  React.useEffect(() => {
    if (settings) {
      setMyBday(settings.myBirthday);
      setMyBdayWishes(settings.sendBirthDayWishes);
      setSeeFollowers(settings.followersFollowings);
      setSendBdayCard(settings.shareBirthDayCard);
      setMyProfile(settings.myProfile);
    }
  }, [settings]);

  React.useEffect(() => {
    const unsubscribe = setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => {
      clearInterval(unsubscribe);
    };
  }, []);

  React.useEffect(() => {
    if (data?.updatePrivacySettings) {
      setError(data?.updatePrivacySettings.message.message);
      setCounter(5);
    }
  }, [data]);
  React.useEffect(() => {
    if (
      data?.updatePrivacySettings.success &&
      data?.updatePrivacySettings.message &&
      counter === 0
    ) {
      setError("");
    }
  }, [data, counter]);

  const updatePrivacySettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateSettings({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          followersFollowings: seeFollowers,
          myBirthday: myBday,
          myProfile: myProfile,
          sendBirthDayWishes: sendBdayCard,
          shareBirthDayCard: sendBdayCard,
        },
      },
    });
  };

  return (
    <form className={styles.privacy__settings} onSubmit={updatePrivacySettings}>
      <p
        className={
          data?.updatePrivacySettings.success
            ? styles.privacy__settings__message
            : styles.privacy__settings__error
        }
      >
        {error}
      </p>
      <h1>Manage your Privacy</h1>
      <div>
        {loading ? <Submitting /> : null}
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
        {loading ? <Submitting /> : null}
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
        {loading ? <Submitting /> : null}
        <p>Who will see my Profile?</p>
        <select
          value={myProfile}
          onChange={(e) => setMyProfile(e.target.value)}
        >
          {privacyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        {loading ? <Submitting /> : null}
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
        {loading ? <Submitting /> : null}
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

      <Button type="submit" isLoading={loading}>
        Save Changes
      </Button>
      <p>
        Managing your privacy is changing the visibility of your information to
        the other users of cakesday.
      </p>
    </form>
  );
};

export default PrivacySettings;
