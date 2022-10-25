import { Field, InputType } from "type-graphql";

@InputType()
export class FriendSuggestionInputType {
  @Field(() => String)
  accessToken: string;
}
