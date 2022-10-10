import { User } from "../../../entities/User/User";
import { Field, ObjectType } from "type-graphql";
import { AuthError } from "../../user/ObjectTypes/AuthError";

@ObjectType()
export class UpdateProfileObjectType {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => AuthError, { nullable: true })
  error?: AuthError;

  @Field(() => String, { nullable: true })
  accessToken?: String;
}
