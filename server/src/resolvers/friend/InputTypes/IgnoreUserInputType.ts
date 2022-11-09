import { Field, InputType } from "type-graphql";

@InputType()
export class IgnoreUserInputType {
  @Field(() => String)
  friendUsername: string;

  @Field(() => String)
  accessToken: string;
}
