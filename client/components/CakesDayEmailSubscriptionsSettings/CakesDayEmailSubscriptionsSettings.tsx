import { theme, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CommonSettings,
  FriendsSuggestionsDocument,
  MeDocument,
  useUpdateCommonSettingsMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import styles from "./CakesDayEmailSubscriptionsSettings.module.css";
interface Props {
  settings: CommonSettings;
}
const CakesDayEmailSubscriptionsSettings: React.FC<Props> = ({ settings }) => {
  const [subscription, setSubscription] = useState(0);

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
    }
  }, [data]);

  React.useEffect(() => {
    if (settings) {
      setSubscription(settings.emailSubscriptions ? 1 : 0);
    }
  }, [settings]);

  const updateEmailSubScriptions = async () => {
    await updateSettings({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          emailSubscriptions: Boolean(subscription),
        },
      },
    });
  };
  return (
    <div className={styles.cakes__day__email__subscriptions__settings}>
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
          onChangeCapture={updateEmailSubScriptions}
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
      <p>Subscribe to news letters from cakesdays via email.</p>
    </div>
  );
};

export default CakesDayEmailSubscriptionsSettings;
