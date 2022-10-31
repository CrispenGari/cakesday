import React from "react";

import styles from "./ChangeThemeSettings.module.css";
import { Switch } from "@chakra-ui/react";
import { ThemeType } from "../../types";
import {
  CommonSettings,
  FriendsSuggestionsDocument,
  MeDocument,
  useUpdateCommonSettingsMutation,
} from "../../graphql/generated/graphql";
import Submitting from "../Submitting/Submitting";
import { getAccessToken } from "../../state";
interface Props {
  settings: CommonSettings;
}
const ChangeThemeSettings: React.FC<Props> = ({ settings }) => {
  const [theme, setTheme] = React.useState<ThemeType>("light");
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

  return (
    <div className={styles.change__theme__settings}>
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
          onChangeCapture={updateTheme}
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

      <p>This theme will be saved in your settings.</p>
    </div>
  );
};

export default ChangeThemeSettings;
