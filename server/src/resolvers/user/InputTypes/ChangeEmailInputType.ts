import { Field, InputType } from "type-graphql";

@InputType()
export class ChangeEmailInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  currentPassword: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class VerifyNewEmailInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  verificationCode: string;
}
