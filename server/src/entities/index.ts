import { MixedList, EntitySchema } from "typeorm";
import { Follower } from "./Follower/Follower";
import { Following } from "./Following/Following";
import { Friend } from "./Friends/Friends";
import { Profile } from "./Profile/Profile";
import { CommonSettings } from "./Settings/Common/Common";
import { NotificationsSettings } from "./Settings/Notifications/Notification";
import { PrivacySettings } from "./Settings/Privacy/Privacy";
import { Settings } from "./Settings/Settings";
import { User } from "./User/User";

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
];
