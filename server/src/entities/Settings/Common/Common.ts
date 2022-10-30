import { ThemeType } from "../../../types";
import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class CommonSettings extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String, { nullable: false })
  @Column({
    nullable: true,
    type: "enum",
    enum: ThemeType,
    default: ThemeType.LIGHT,
  })
  theme: string;

  @Field(() => Boolean)
  @Column({ nullable: false, default: true, type: "bool" })
  emailSubscriptions: false | true;

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;
}
