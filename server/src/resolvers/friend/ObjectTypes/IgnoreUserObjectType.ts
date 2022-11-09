import { AuthError } from "../../user/ObjectTypes/AuthError";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class IgnoreUserObjectType {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => AuthError, { nullable: false })
  message: AuthError;
}
