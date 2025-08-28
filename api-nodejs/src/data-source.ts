import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "123456A#",
    database: "dbloja",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});