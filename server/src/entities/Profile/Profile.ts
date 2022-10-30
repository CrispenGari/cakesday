import { GenderType } from "../../types";
import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
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
  bday: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  bio: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ nullable: false, default: false })
  verified: false | true;
}
