import "reflect-metadata";
import { DataSource } from "typeorm";

export const DataBase = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 2010,
  username: "postgres",
  password: "ninetysix",
  database: "hotel",
  synchronize: true,
  logging: false,
  entities: ["src/entities/**.ts"],
  migrations: [],
  subscribers: [],
});
