import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}