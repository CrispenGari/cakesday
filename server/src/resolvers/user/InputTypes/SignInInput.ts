


import { Field, InputType } from "type-graphql";

@InputType()
export class SignInInput {
  @Field(() => String)
  usernameOrEmail: string;

  @Field(() => String)
  password: string;
}