import "dotenv/config";
import { env } from "../config/env";
import {logger} from "../config/logger";
import app  from "./app";
import {testdb} from "../infrastructure/db/sequelize"
import {initModels} from "../infrastructure/models/index"



(async () => {
    await testdb();
    initModels();



    app.listen(env.PORT, () => logger.info(`My API Stop on http://localhst:${env.PORT}`));
}




)()
