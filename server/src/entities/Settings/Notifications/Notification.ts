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
export class NotificationsSettings extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false, type: "bool" })
  onNewUserAccountCreation: false | true;

  @Field(() => Boolean)
  @Column({ nullable: false, default: true, type: "bool" })
  onNewFollowers: false | true;

  @Field(() => Boolean)
  @Column({ nullable: false, default: true, type: "bool" })
  onNewFriends: false | true;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false, type: "bool" })
  onFriendProfileUpdate: false | true;

  @Field(() => Boolean)
  @Column({ nullable: false, default: true, type: "bool" })
  onFriendBirthday: false | true;

  @Field(() => Boolean)
  @Column({ nullable: false, default: true, type: "bool" })
  onBirthDayWish: false | true;

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;
}
