import { User } from "../../../entities/User/User";
import { Field, ObjectType } from "type-graphql";
import { AuthError } from "./AuthError";

@ObjectType()
export class VerifyEmailObjectType {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => AuthError, { nullable: true })
  error?: AuthError;

  @Field(() => String, { nullable: true })
  accessToken?: String;
}
