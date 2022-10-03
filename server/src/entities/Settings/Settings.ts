import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class Settings extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  theme: string;
}
