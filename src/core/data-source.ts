import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: Boolean(process.env.SYNCHRONIZE),
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
