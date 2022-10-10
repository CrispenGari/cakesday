import { Field, InputType } from "type-graphql";

@InputType()
export class ProfileInput {
  @Field(() => String, { nullable: false })
  accessToken: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true, defaultValue: "male" })
  gender?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  bday?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  banner?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => Boolean, { nullable: true })
  verified?: boolean;
}
