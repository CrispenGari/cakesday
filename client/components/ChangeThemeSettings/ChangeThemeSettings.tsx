import React from "react";

import styles from "./ChangeThemeSettings.module.css";
import { Switch } from "@chakra-ui/react";
import { ThemeType } from "../../types";
interface Props {}
const ChangeThemeSettings: React.FC<Props> = ({}) => {
  const [theme, setTheme] = React.useState<ThemeType>("light");

  return (
    <div className={styles.change__theme__settings}>
      <h1>Theme Settings</h1>
      <div>
        <p>{theme === "dark" ? "Dark" : "Light"}</p>
        <Switch
          value={theme}
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
