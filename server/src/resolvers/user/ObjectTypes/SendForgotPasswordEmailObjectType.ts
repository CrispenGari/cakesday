import { Field, ObjectType } from "type-graphql";
import { AuthError } from "./AuthError";

@ObjectType()
export class SendForgotPasswordEmailObjectType {
  @Field(() => AuthError, { nullable: true })
  message?: AuthError;

  @Field(() => Boolean, { nullable: false })
  success?: boolean;
}
