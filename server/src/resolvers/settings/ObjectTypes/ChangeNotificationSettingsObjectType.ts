import { AuthError } from "../../../resolvers/user/ObjectTypes/AuthError";
import { ObjectType, Field } from "type-graphql";
@ObjectType()
export class ChangeNotificationSettingsObjectType {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => AuthError)
  message: AuthError;
}
