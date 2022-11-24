import { BirthdayCardType, NotificationType, EmotionType } from "../../types";
import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../User/User";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String)
  @Column({
    nullable: false,
    type: "enum",
    enum: NotificationType,
  })
  type: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    type: "enum",
    enum: BirthdayCardType,
  })
  bdayCard: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    type: "enum",
    enum: EmotionType,
  })
  reaction: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  bdayMessage: String;

  @Field(() => String)
  @Column({ nullable: false, type: "text" })
  message: String;

  @Field(() => Boolean)
  @Column({ nullable: false, type: "boolean", default: false })
  read: boolean;

  @Field(() => Int)
  @Column({ nullable: false })
  fromId: number;

  @Field(() => String)
  @Column({ nullable: false })
  fromUsername: string;

  @Field(() => String)
  @Column({ nullable: false })
  fromEmail: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  fromPhotoURL?: string;

  @Field(() => String)
  @Column({ nullable: false })
  fromBDay: string;

  @Field(() => String)
  @Column({ nullable: false })
  fromGender: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  fromBannerURL?: string;

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications, { eager: true })
  user: User;

  @Field(() => String)
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
