import { Syndicate } from "../models/syndicate.model";


export class SyndicateSequelizeRepository {
list(){return Syndicate.findAll();}
get(id: number) {return Syndicate.findByPk(id);}
create(name: string) {return Syndicate.create({name}); }
async update(id: number, name:string) {
    const[count, rows] = await Syndicate.update({name},{where:{id}, returning:true});
    if(!count) throw new Error(`Syndicate ${id} not available or not found`);
    return rows[0];
}
async remove(id:number){
    const deleted= await Syndicate.destroy({where:{id}});
    if(!deleted) throw new Error(`Syndicate ${id} not found`);
}
}