import { theme, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./CakesDayEmailSubscriptionsSettings.module.css";
interface Props {}
const CakesDayEmailSubscriptionsSettings: React.FC<Props> = ({}) => {
  const [subscription, setSubscription] = useState(0);
  return (
    <div className={styles.cakes__day__email__subscriptions__settings}>
      <h1>Email Subscriptions</h1>
      <div>
        <p>{!!subscription ? "UnSubscribe" : "Subscribe"}</p>
        <Switch
          value={subscription}
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
