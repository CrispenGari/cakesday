import { DataSource } from "typeorm";
import { entities } from "../entities";

export const dataSource = new DataSource({
  type: "mongodb",
  host: "127.0.0.1",
  port: 27017,
  database: "cakesday",
  synchronize: false,
  logging: false,
  entities,
});
