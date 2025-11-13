import { Router } from "express";
import syndicates from "./syndicates.routes";
import transports from "./transport.routes"
import users from "./users.routes";
import stops from "./stops.routes";
import times from "./times.routes";

const r = Router();
r.use("/syndicates", syndicates);

r.use("/users", users);
r.use("/stops", stops);
r.use("/transports", transports);
r.use("/times",times);


export default r;
