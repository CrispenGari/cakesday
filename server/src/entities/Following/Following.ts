import { Field, ObjectType, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { Profile } from "../Profile/Profile";

import { User } from "../User/User";

@ObjectType()
@Entity()
export class Following extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  photoURL: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bannerURL: string;

  @Field(() => String)
  @Column({ nullable: false, default: "male" })
  gender: string;

  @Field(() => String)
  @Column({ nullable: true, type: "text" })
  bday: String;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  bio: string;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false })
  verified: false | true;

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followings)
  user: User;

  @Field(() => String)
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
