import { theme, Switch, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CommonSettings,
  FriendsSuggestionsDocument,
  MeDocument,
  useUpdateCommonSettingsMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import Submitting from "../Submitting/Submitting";
import styles from "./CakesDayEmailSubscriptionsSettings.module.css";
interface Props {
  settings: CommonSettings;
}
const CakesDayEmailSubscriptionsSettings: React.FC<Props> = ({ settings }) => {
  const [subscription, setSubscription] = useState(0);
  const [counter, setCounter] = React.useState(5);
  const [error, setError] = React.useState("");
  const [updateSettings, { loading, data }] = useUpdateCommonSettingsMutation({
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
    if (data?.updateCommonSettings) {
      setError(data.updateCommonSettings.message.message);
      setCounter(5);
    }
  }, [data]);
  React.useEffect(() => {
    if (
      data?.updateCommonSettings.success &&
      data.updateCommonSettings.message &&
      counter === 0
    ) {
      setError("");
    }
  }, [data, counter]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted)
      if (settings) {
        setSubscription(settings.emailSubscriptions ? 1 : 0);
      }

    return () => {
      mounted = false;
    };
  }, [settings]);

  React.useEffect(() => {
    const unsubscribe = setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => {
      clearInterval(unsubscribe);
    };
  }, []);

  const updateEmailSubScriptions = async () => {
    await updateSettings({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          emailSubscriptions: subscription === 1 ? true : false,
        },
      },
    });
  };
  return (
    <div className={styles.cakes__day__email__subscriptions__settings}>
      {loading ? <Submitting /> : null}
      <h1>Email Subscriptions</h1>
      <p
        className={
          data?.updateCommonSettings.success
            ? styles.cakes__day__email__subscriptions__settings__message
            : styles.cakes__day__email__subscriptions__settings__error
        }
      >
        {error}
      </p>
      <div>
        <p>{!!subscription ? "UnSubscribe" : "Subscribe"}</p>
        <Switch
          value={subscription}
          isChecked={!!subscription}
          onChange={(e) => {
            if (e.target.checked) {
              setSubscription(1);
            } else {
              setSubscription(0);
            }
          }}
        />
      </div>
      <Button onClick={updateEmailSubScriptions} isLoading={loading}>
        Save Changes
      </Button>
      <p>Subscribe to news letters from cakesdays via email.</p>
    </div>
  );
};

export default CakesDayEmailSubscriptionsSettings;
