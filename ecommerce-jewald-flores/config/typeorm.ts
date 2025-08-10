import ENV from "./environment";
import {registerAs} from "@nestjs/config";
import {DataSource, DataSourceOptions} from "typeorm";


const config = {
    type: "postgres",
    database: ENV.DB_NAME,
    host: ENV.DB_HOST || 'localhost',
    port: ENV.DB_PORT as unknown as number, 
    username:ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    logging: false,
    synchronize: false,
    dropSchema: false,
};

export const typeOrmConfig = registerAs ("typeorm", () => config);
//la linea siguiente es necesaria para poder correr las migraciones 
//desde la terminal con el comando: npm run typeorm migration: run 
export const connectionSource = new DataSource(config as DataSourceOptions);