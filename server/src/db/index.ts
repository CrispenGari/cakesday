import { entities } from "../entities";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "cakesday",
  synchronize: true,
  logging: false,
  entities,
});
