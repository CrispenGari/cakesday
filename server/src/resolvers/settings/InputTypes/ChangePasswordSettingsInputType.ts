import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordSettingInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  password1: string;

  @Field(() => String)
  password2: string;

  @Field(() => String)
  currentPassword: string;
}
