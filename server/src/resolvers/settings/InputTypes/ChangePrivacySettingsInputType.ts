import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePrivacySettingsInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String, { nullable: true })
  myProfile?: string;

  @Field(() => String, { nullable: true })
  myBirthday?: string;

  @Field(() => String, { nullable: true })
  sendBirthDayWishes?: string;

  @Field(() => String, { nullable: true })
  shareBirthDayCard?: string;

  @Field(() => String, { nullable: true })
  followersFollowings?: string;
}
