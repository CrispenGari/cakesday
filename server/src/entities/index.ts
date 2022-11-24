import { MixedList, EntitySchema } from "typeorm";
import { Follower } from "./Follower/Follower";
import { Following } from "./Following/Following";
import { Friend } from "./Friends/Friends";
import { IgnoredBirthdays } from "./IgnoredBirthdays/IgnoredBirthdays";
import { IgnoredUser } from "./IngoredUser/IngoredUser";
import { Notification } from "./Notification/Notification";
import { Profile } from "./Profile/Profile";
import { CommonSettings } from "./Settings/Common/Common";
import { NotificationsSettings } from "./Settings/Notifications/Notification";
import { PrivacySettings } from "./Settings/Privacy/Privacy";
import { Settings } from "./Settings/Settings";
import { User } from "./User/User";
import { Wished } from "./Wished/Wished";

export const entities:
  | MixedList<string | Function | EntitySchema<any>>
  | undefined = [
  User,
  Following,
  Follower,
  Profile,
  Settings,
  Friend,
  CommonSettings,
  NotificationsSettings,
  PrivacySettings,
  IgnoredUser,
  Notification,
  Wished,
  IgnoredBirthdays
];
