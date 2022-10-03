import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectID;

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
}
