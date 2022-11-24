import { ObjectType, Field, Int } from "type-graphql";
import { GenderType } from "../../types";
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
export class IgnoredBirthdays extends BaseEntity {
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
  @Column({
    nullable: false,
    default: GenderType.MALE,
    type: "enum",
    enum: GenderType,
  })
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
  @ManyToOne(() => User, (user) => user.ignoredUsers)
  user: User;

  @Field(() => String)
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
