import { email, z} from "zod";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import {UserSequelizeRepository} from "../../../infrastructure/repositories/user.sequelize.repo";
import { UserService } from "../../../application/services/user.services";
import { json } from "sequelize";



const service = new UserService(new UserSequelizeRepository());

const createSchema = z.object({
    email: z.string().email(),
    fullName: z.string().min(2),
    role: z.string().min(3).default("user").optional(),
    password: z.string().min(6).optional(),
});

const updateSchema = z.object({
    email: z.string().email().optional(),
    fullName: z.string().min(2).optional(),
    role: z.string().min(3).default("user").optional(),
    password: z.string().min(6).optional(),
});


export async function list(_req:any, res:any, next:any) {
    try{res.json(await service.list());}
    catch (e) {next(e);}
    
}


export async function getById(req:Request, res:Response, next:NextFunction) {
    try {
        const data = createSchema.parse(req.body);
        let passwordHash: string | null = null;
        if (data.password) passwordHash = await bcrypt.hash(data.password, 10);
        const created = await service.create ({
            email: data.email,
            fullName: data.fullName,
            role: data.role || "user",
            passwordHash,
        });
        res.status(201).json(created);
    } catch(e) {
        if(e instanceof z.ZodError) return res.status(400).json({message:"Error validation", errors: e.issues});
        next(e);
    }
}

export async function remove( req:Request, res:Response, next:NextFunction) {
    try{
        const id = Number(req.params.id);
        await service.remove(id);
        res.status(204).send();
    } catch (e) {next(e);}
}