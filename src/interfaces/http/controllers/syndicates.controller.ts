import {z} from "zod";
import { SyndicateSequelizeRepository } from "../../../infrastructure/repositories/syndicate.sequelize.repo";
import { SyndicateService } from "../../../application/services/syndicate.service";



const service = new SyndicateService(new SyndicateSequelizeRepository());
const schema = z.object({name:z.string().min(2)});


export async function list(_req:any, res:any) {res.json(await service.list());}

export async function getById(req:any, res:any)  {
    const id = Number(req.param.id); const item = await service.get(id);
    if(!item) return res.status(404).json({message:"Not FOund"});
    res.json(item);
}

export async function create(req:any, res:any) {
    const {name} = schema.parse(req.body);
    const created =  await service.create(name);
    res.status(201).json(created);
    
}

export async function update(req:any, res:any) {
    const id= Number(req.params.id);
    const {name}= schema.parse(req.body);
    const updated = await service.update(id, name);
    res.json(updated);
}

export async function remove(req:any, res:any) {
    const id= Number(req.params.id);
    await service.remove(id)
    res.status(204).send();

}




