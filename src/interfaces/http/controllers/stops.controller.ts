import {z} from "zod";
import { StopSequelizeRepository } from "../../../infrastructure/repositories/stop.sequelize.repo";
import { StopService } from "../../../application/services/stop.service";
import {Request, Response, NextFunction } from "express";



const service = new StopService(new StopSequelizeRepository()
);

const createSchema = z.object({
    name: z.string().min(2),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
});

const updateSchema = createSchema.partial();

export async function list(_req: Request, res: Response, next: NextFunction) {
    try{res.json(await service.list());}
    catch(e) {next(e);}
    
}

export async function getById(_req: Request, res:Response, next:NextFunction) {
    try {
        const id = Number(_req.params.id);
        const item = await service.get(id);
        if(!item) return res.status(404).json({message:"Not econtrado!"});
        res.json(item);

    }catch (e) {next(e);}
    
}


export async function create(_req: Request, res: Response, next:NextFunction) {
    try {
        const data = createSchema.parse(_req.body);
        const created = await service.create(data);
        res.status(201).json(created);
    } catch(e){
        if (e instanceof z.ZodError) return res.status(400).json({message: "valudatio error", errors:e.issues})
         next(e);

    }
    
}


export async function update(req:Request, res: Response, next:NextFunction) {
    try {
        const id = Number(req.params.id);
        const data = updateSchema.parse(req.body);
        const updated = await service.update(id, data);
        res.json(updated);
    } catch(e) {
        if (e instanceof z.ZodError) return res.status(400).json({message:"validation error!", errors:e.issues});
        next(e);
    }
    
}


export async function remove(req:Request, res: Response, next:NextFunction) {
    try{
        const id  = Number(req.params.id);
        await service.remove(id);
        res.status(204).send();
    } catch (e) {next(e);}
    
}

