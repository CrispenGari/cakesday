import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CommonSettings } from "./Common/Common";
import { NotificationsSettings } from "./Notifications/Notification";
import { PrivacySettings } from "./Privacy/Privacy";

@ObjectType()
@Entity()
export class Settings extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;

  /** Relations between the settings and other entities */
  // NotificationsSettings
  @Field(() => NotificationsSettings, { nullable: true })
  @OneToOne(() => NotificationsSettings, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  notifications: NotificationsSettings;

  // PrivacySettings
  @Field(() => PrivacySettings, { nullable: true })
  @OneToOne(() => PrivacySettings, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  privacy: PrivacySettings;

  // CommonSettings
  @Field(() => CommonSettings, { nullable: true })
  @OneToOne(() => CommonSettings, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  common: CommonSettings;
}
