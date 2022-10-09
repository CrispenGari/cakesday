import { Field, InputType } from "type-graphql";

@InputType()
export class VerifyEmailInput {
  @Field(() => String, { nullable: false, name: "accessToken" })
  accessToken: string;

  @Field(() => String, { nullable: true })
  verificationCode?: string;
}
