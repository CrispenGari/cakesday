import { InputType, Field, Int } from "type-graphql";

@InputType()
export class MyNotificationInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => Int, { nullable: true })
  notificationId: number;
}
