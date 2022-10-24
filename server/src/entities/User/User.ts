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
import { Friend } from "../Friend/Friend";
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
  @OneToOne(() => Profile, { eager: false })
  @JoinColumn()
  profile: Profile;

  // Settings
  @Field(() => Settings, { nullable: true })
  @OneToOne(() => Settings, { eager: true })
  @JoinColumn()
  settings: Settings;
  // Friends

  @Field(() => [Friend], { nullable: true })
  @OneToMany(() => Friend, (friend) => friend.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  friends: Friend[];
}
