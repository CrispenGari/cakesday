import React from "react";

import styles from "./ChangeThemeSettings.module.css";
import { Button, Switch } from "@chakra-ui/react";
import { StateType, ThemeType } from "../../types";
import {
  CommonSettings,
  FriendsSuggestionsDocument,
  MeDocument,
  useUpdateCommonSettingsMutation,
} from "../../graphql/generated/graphql";
import Submitting from "../Submitting/Submitting";
import { getAccessToken } from "../../state";
import { useSelector } from "react-redux";
interface Props {
  settings: CommonSettings;
}
const ChangeThemeSettings: React.FC<Props> = ({ settings }) => {
  const [theme, setTheme] = React.useState<ThemeType>("light");
  const [error, setError] = React.useState("");
  const [counter, setCounter] = React.useState(0);
  const [updateSettings, { loading, data }] = useUpdateCommonSettingsMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: MeDocument, variables: {} },
      {
        query: FriendsSuggestionsDocument,
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });

  React.useEffect(() => {
    const unsubscribe = setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => {
      clearInterval(unsubscribe);
    };
  }, []);

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
    if (settings) {
      setTheme(settings.theme as any);
    }
  }, [settings]);

  const updateTheme = async () => {
    await updateSettings({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          theme,
        },
      },
    });
  };
  const myTheme = useSelector(({ theme }: StateType) => theme);
  return (
    <div
      className={
        myTheme === "dark"
          ? styles.change__theme__settings__dark
          : styles.change__theme__settings
      }
    >
      {loading ? <Submitting /> : null}
      <h1>Theme Settings</h1>
      <p
        className={
          data?.updateCommonSettings.success
            ? styles.change__theme__settings__message
            : styles.change__theme__settings__error
        }
      >
        {error}
      </p>
      <div>
        <p>{theme === "dark" ? "Dark" : "Light"}</p>
        <Switch
          value={theme}
          isChecked={theme === "dark"}
          onChange={(e) => {
            if (e.target.checked) {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
        />
      </div>

      <Button isLoading={loading} onClick={updateTheme}>
        Save Theme
      </Button>
      <p>This theme will be saved in your settings.</p>
    </div>
  );
};

export default ChangeThemeSettings;
