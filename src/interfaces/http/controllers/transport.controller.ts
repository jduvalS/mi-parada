import {z} from "zod";
import { TransportSequelizeRepository } from "../../../infrastructure/repositories/transport.sequelize.repo";
import { TransportService} from "../../../application/services/transport.service";
import { Request, Response, NextFunction } from "express";

const service = new TransportService(new TransportSequelizeRepository());

const createSchema = z.object( {
    name: z.string().min(2),
    type: z.number().int().refine(v => v ===0 ||  v === 1, "the type must be 0 or 1"), 
    syndicateId: z.number().int().optional().nullable(),
    ownerId: z.number().int().optional().nullable(),
});


const updateSchema = createSchema.partial();


export async function list(_req: Request, res: Response, next: NextFunction) {
    try{ res.json(await service.list()); }
    catch (e) {next(e);}
    
}



export async function getById(_req:Request, res: Response, next: NextFunction) {
    try{
        const id = Number(_req.params.id);
        const item = await service.get(id);
        if (!item) return res.status(404).json({message:"not found"}) 
            res.json(item);
    } catch(e) {next(e);}
}

export async function create(_req: Request, res: Response, next: NextFunction) {
    try{
        const data = createSchema.parse(_req.body);
        const created =  await service.create(data);
        res.status(201).json(created);
    } catch (e) {
        if( e instanceof z.ZodError) return res.status(400).json({message:"validation error", errors:e.issues});
        next(e);
    }    
}

export async function update(_req: Request, res: Response, next:NextFunction) {
    try {
        const id = Number(_req.params.id);
        const data = updateSchema.parse(_req.body);
        const updated = await service.update(id, data);
        res.json(updated);
    } catch (e) {
        if (e instanceof z.ZodError) return res.status(400).json({message:"validation error", errors:e.issues});
        next(e);
    }
    
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id= Number(req.params.id);
        await service.remove(id);
        res.status(204).send({message:"suceeded without content",});
    }catch (e) {next(e);}
    
}