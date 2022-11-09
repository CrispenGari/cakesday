import { NotificationType } from "../../types";
import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Profile } from "../Profile/Profile";
import { User } from "../User/User";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String)
  @Column({
    nullable: false,
    type: "enum",
    enum: NotificationType,
  })
  type: string;

  @Field(() => String)
  @Column({ nullable: false, type: "text" })
  message: String;

  @Field(() => String)
  @Column({ nullable: false, type: "boolean", default: false })
  read: String;

  // Relations
  @Field(() => Profile)
  @OneToOne(() => Profile, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  from: Profile;

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Field(() => String)
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
