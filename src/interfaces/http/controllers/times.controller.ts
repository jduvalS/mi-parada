import { any, z } from "zod";
import { TimeSequelizeRepository } from "../../../infrastructure/repositories/time.sequelize.repo.js";
import { TimeService } from "../../../application/services/time.service.js";
import { Request, Response, NextFunction } from "express";

const service = new TimeService(new TimeSequelizeRepository());

const createSchema = z.object({
  transportId: z.number().int(),
  stopId: z.number().int(),
  // acepta ISO strings tipo "2025-11-12T20:30:00Z"
  arrivalAt: z.coerce.date(),
});
const updateSchema = createSchema.partial();

export async function list(_req: Request, res: Response, next:NextFunction) {
  try { res.json(await service.list()); }
  catch (e) { next(e); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const item = await service.get(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createSchema.parse(req.body);
    const created = await service.create(data);
    res.status(201).json(created);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ message: "Validation error", errors: e.issues });
    next(e);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = updateSchema.parse(req.body);
    const updated = await service.update(id, data);
    res.json(updated);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ message: "Validation error", errors: e.issues });
    next(e);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await service.remove(id);
    res.status(204).send();
  } catch (e) { next(e); }
}
