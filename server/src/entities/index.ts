import { MixedList, EntitySchema } from "typeorm";
import { Friend } from "./Friend/Friend";
import { Profile } from "./Profile/Profile";
import { Settings } from "./Settings/Settings";
import { User } from "./User/User";

export const entities:
  | MixedList<string | Function | EntitySchema<any>>
  | undefined = [User, Friend, Profile, Settings];
