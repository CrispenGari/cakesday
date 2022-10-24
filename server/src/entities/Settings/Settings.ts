import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Settings extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  theme: string;
}
