import { AuthError } from "../../../resolvers/user/ObjectTypes/AuthError";
import { Field, ObjectType } from "type-graphql";
import { User } from "../../../entities/User/User";

@ObjectType()
export class FriendSuggestionObjectType {
  @Field(() => [User])
  suggestions: User[];

  @Field(() => AuthError, { nullable: true })
  error?: AuthError;
}
