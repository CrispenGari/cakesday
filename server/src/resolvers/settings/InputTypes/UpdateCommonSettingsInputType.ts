import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCommonSettingsInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String, { nullable: true })
  theme?: string;

  @Field(() => Boolean, { nullable: true })
  emailSubscriptions?: boolean;
}
