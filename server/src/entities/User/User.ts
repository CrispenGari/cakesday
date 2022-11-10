import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Follower } from "../Follower/Follower";
import { Following } from "../Following/Following";
import { Friend } from "../Friends/Friends";
import { IgnoredUser } from "../IngoredUser/IngoredUser";
import { Notification } from "../Notification/Notification";
import { Profile } from "../Profile/Profile";
import { Settings } from "../Settings/Settings";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String)
  @Column({ type: "varchar", unique: true, length: 25 })
  username: string;

  @Field(() => String)
  @Column({ type: "varchar", unique: true, length: 25 })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false, type: "bool" })
  isLoggedIn: false | true;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false, type: "bool" })
  confirmed: false | true;

  @Column("int", { default: 0 })
  tokenVersion: number;

  // @BeforeInsert()
  // beforeInsertActions() {
  //   this.tokenVersion = 0;
  //   this.confirmed = false;
  //   this.isLoggedIn = false;
  // }

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;

  /** Relations between the user and other entities */
  // Profile
  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  // Settings
  @Field(() => Settings, { nullable: true })
  @OneToOne(() => Settings, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  settings: Settings;

  // Notifications
  @Field(() => [Notification], { nullable: true })
  @OneToMany(() => Notification, (notification) => notification.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  notifications: Follower[];

  // Ignored Users
  @Field(() => [IgnoredUser], { nullable: true })
  @OneToMany(() => IgnoredUser, ({ user }) => user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  ignoredUsers: IgnoredUser[];

  // Followers
  @Field(() => [Follower], { nullable: true })
  @OneToMany(() => Follower, (follower) => follower.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  followers: Follower[];

  // Followings
  @Field(() => [Following], { nullable: true })
  @OneToMany(() => Following, (following) => following.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  followings: Following[];

  // Friends (you only be friends if you guys follow each other)
  @Field(() => [Friend], { nullable: true })
  @OneToMany(() => Friend, (friend) => friend.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  friends: Friend[];
}
