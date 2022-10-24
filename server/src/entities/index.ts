import { MixedList, EntitySchema } from "typeorm";
import { Follower } from "./Follower/Follower";
import { Following } from "./Following/Following";
import { Profile } from "./Profile/Profile";
import { Settings } from "./Settings/Settings";
import { User } from "./User/User";

export const entities:
  | MixedList<string | Function | EntitySchema<any>>
  | undefined = [User, Following, Follower, Profile, Settings];
