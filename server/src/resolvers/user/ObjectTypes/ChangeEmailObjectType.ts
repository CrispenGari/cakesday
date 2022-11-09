import { Field, ObjectType } from "type-graphql";
import { AuthError } from "./AuthError";

@ObjectType()
export class ChangeEmailObjectType {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => AuthError)
  message: AuthError;
}
