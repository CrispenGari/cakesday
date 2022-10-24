import { Field, ObjectType, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
 PrimaryGeneratedColumn
} from "typeorm";
// import { Profile } from "../Profile/Profile";

import { User } from "../User/User";

// interface InputI {
//   userProfile: Profile;
//   profileId: string;
//   email: string;
//   username: string;
//   photoURL?: string;
//   bannerURL?: string;
//   gender: string;
//   bday?: string;
//   bio?: string;
//   verified: boolean;
// }
@ObjectType()
@Entity()
export class Friend extends BaseEntity {
  // constructor(input: InputI) {
  //   super();
  //   const {
  //     bannerURL,
  //     _id,
  //     bio,
  //     email,
  //     username,
  //     bday,
  //     gender,
  //     photoURL,
  //     verified,
  //   } = input?.userProfile;

  //   this.bannerURL = bannerURL;
  //   this.bday = bday;
  //   this.email = email;
  //   this.bio = bio;
  //   this.username = username;
  //   this.gender = gender;
  //   this.verified = verified;
  //   this.photoURL = photoURL;
  //   this.profileId = _id as any;
  // }

  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String)
  @Column({ nullable: false })
  profileId: String;

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
  @Column({ nullable: true, type: "date" })
  bday: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  bio: string;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false })
  verified: false | true;

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.friends)
  user: User;

  @Field(() => String)
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
