import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInputType {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => String, { nullable: false })
  password: string;
}
