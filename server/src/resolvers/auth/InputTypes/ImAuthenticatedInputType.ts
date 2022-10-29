import { Field, InputType } from "type-graphql";

@InputType()
export class ImAuthenticatedInputType {
  @Field(() => String)
  refreshToken: string;
}
