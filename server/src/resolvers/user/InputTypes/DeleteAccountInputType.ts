import { InputType, Field } from "type-graphql";

@InputType()
export class DeleteAccountInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  currentPassword: string;
}
