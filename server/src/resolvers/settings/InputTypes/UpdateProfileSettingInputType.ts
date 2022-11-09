import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateProfileSettingInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  bday?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  bannerImage?: FileUpload;

  @Field(() => GraphQLUpload, { nullable: true })
  avatarImage?: FileUpload;
}
