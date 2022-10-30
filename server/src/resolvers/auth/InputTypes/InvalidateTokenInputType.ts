import { InputType, Field } from "type-graphql";

@InputType()
export class InvalidateTokenInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  currentPassword: string;
}
