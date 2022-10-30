import React from "react";

import styles from "./ChangeThemeSettings.module.css";
import { Switch } from "@chakra-ui/react";
import { ThemeType } from "../../types";
import { CommonSettings } from "../../graphql/generated/graphql";
interface Props {
  settings: CommonSettings;
}
const ChangeThemeSettings: React.FC<Props> = ({ settings }) => {
  const [theme, setTheme] = React.useState<ThemeType>("light");

  React.useEffect(() => {
    if (settings) {
      setTheme(settings.theme as any);
    }
  }, [settings]);

  return (
    <div className={styles.change__theme__settings}>
      <h1>Theme Settings</h1>
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
      <p>This theme will be saved in your settings.</p>
    </div>
  );
};

export default ChangeThemeSettings;
