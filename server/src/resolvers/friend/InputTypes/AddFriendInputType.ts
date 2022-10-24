import { Field, InputType } from "type-graphql";



@InputType()
export class AddFriendInputType{
    @Field(()=>String)
    username: string
}