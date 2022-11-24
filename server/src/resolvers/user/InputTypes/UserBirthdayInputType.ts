import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UserBirthdayInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  friendUsername: string;

  @Field(() => String, { nullable: true })
  bdayCard?: string;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  reaction?: string;

  @Field(() => Int, { nullable: true })
  notificationId?: number;
}
