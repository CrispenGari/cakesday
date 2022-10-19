import { Field, InputType } from "type-graphql";

@InputType()
export class SendForgotPasswordEmailInputType {
  @Field(() => String, { nullable: false })
  email: string;
}
