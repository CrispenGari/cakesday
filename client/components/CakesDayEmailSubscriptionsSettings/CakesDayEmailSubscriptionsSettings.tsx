import { theme, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import { CommonSettings } from "../../graphql/generated/graphql";
import styles from "./CakesDayEmailSubscriptionsSettings.module.css";
interface Props {
  settings: CommonSettings;
}
const CakesDayEmailSubscriptionsSettings: React.FC<Props> = ({ settings }) => {
  const [subscription, setSubscription] = useState(0);

  React.useEffect(() => {
    if (settings) {
      setSubscription(settings.emailSubscriptions ? 1 : 0);
    }
  }, [settings]);
  return (
    <div className={styles.cakes__day__email__subscriptions__settings}>
      <h1>Email Subscriptions</h1>
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
      <p>Subscribe to news letters from cakesdays via email.</p>
    </div>
  );
};

export default CakesDayEmailSubscriptionsSettings;
