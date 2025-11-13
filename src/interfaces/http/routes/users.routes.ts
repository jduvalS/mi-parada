import { Router } from "express";
import * as ctrl from "../controllers/users.controller";
import { requireAuth } from "../../../infrastructure/auth/requireAuth";

const r = Router();

r.get("/", ctrl.list);
r.get("/:id", ctrl.getById);
r.post("/", requireAuth, ctrl.create);
r.put("/:id", requireAuth, ctrl.update);
r.delete("/:id", requireAuth, ctrl.remove);

export default r;