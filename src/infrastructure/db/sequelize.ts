import {Sequelize} from "sequelize";
import { env } from "../../config/env";
import{logger} from "../../config/logger";

export const sequelize = new Sequelize(env.DB.name, env.DB.user, env.DB.pass, {
    host: env.DB.host,
    port:env.DB.port,
    dialect:"postgres",
    logging: (msg) => logger.debug(msg)

});

export async function testdb() {
    try{await sequelize.authenticate(); logger.info("postgress COnnected!"); }
    catch (e: any) {throw new Error("error in database" + e.message); process.exit(1)}
}