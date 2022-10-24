import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AddFriendObjectType {
  @Field(() => Boolean)
  success: boolean;
}
