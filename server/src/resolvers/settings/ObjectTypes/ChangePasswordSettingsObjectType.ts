import { AuthError } from "../../../resolvers/user/ObjectTypes/AuthError";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ChangePasswordSettingsObjectType {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => AuthError)
  message: AuthError;
}
