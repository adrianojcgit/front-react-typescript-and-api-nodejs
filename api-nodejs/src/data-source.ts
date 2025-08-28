import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "123456A#",
    database: "dbloja",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});