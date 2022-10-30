import { PrivacyType } from "../../../types";
import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class PrivacySettings extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String, { nullable: false })
  @Column({
    nullable: true,
    type: "enum",
    enum: PrivacyType,
    default: PrivacyType.EVERYONE,
  })
  myProfile: string;

  @Field(() => String, { nullable: false })
  @Column({
    nullable: true,
    type: "enum",
    enum: PrivacyType,
    default: PrivacyType.EVERYONE,
  })
  myBirthday: string;

  @Field(() => String, { nullable: false })
  @Column({
    nullable: true,
    type: "enum",
    enum: PrivacyType,
    default: PrivacyType.FRIENDS,
  })
  sendBirthDayWishes: string;

  @Field(() => String, { nullable: false })
  @Column({
    nullable: true,
    type: "enum",
    enum: PrivacyType,
    default: PrivacyType.FRIENDS,
  })
  shareBirthDayCard: string;

  @Field(() => String, { nullable: false })
  @Column({
    nullable: true,
    type: "enum",
    enum: PrivacyType,
    default: PrivacyType.EVERYONE,
  })
  followersFollowings: string;

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;
}
