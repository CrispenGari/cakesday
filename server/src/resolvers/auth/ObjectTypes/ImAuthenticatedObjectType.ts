import { AuthError } from "../../../resolvers/user/ObjectTypes/AuthError";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ImAuthenticatedObjectType {
  @Field(() => Boolean)
  imAuthenticated: boolean;

  @Field(() => AuthError)
  error: AuthError;
}
