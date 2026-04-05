import ENV from "./environment";
import {registerAs} from "@nestjs/config";
import {DataSource, DataSourceOptions} from "typeorm";


const config = {
    type: "postgres",
    database: ENV.DB_NAME,
    host: ENV.DB_HOST || 'localhost',
    port: Number (ENV.DB_PORT), 
    username:ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    logging: false,
    synchronize: true,
    dropSchema: false,
};

export const typeOrmConfig = registerAs ("typeorm", () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);