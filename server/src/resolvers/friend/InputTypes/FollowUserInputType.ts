import { Field, InputType } from "type-graphql";

@InputType()
export class FollowUserInputType {
  @Field(() => String)
  friendUsername: string;

  @Field(() => String)
  accessToken: string;
}
