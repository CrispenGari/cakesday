import { AuthError } from "../../user/ObjectTypes/AuthError";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UpdateCommonSettingsObjectType {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => AuthError)
  message: AuthError;
}
