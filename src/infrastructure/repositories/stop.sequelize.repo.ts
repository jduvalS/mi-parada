import { StopStation } from "../models/stopstation.model";

export class StopSequelizeRepository {
    list() {return StopStation.findAll(); }
    get(id: number) {return StopStation.findByPk(id); }
    create(data:{name:string; latitude?: number | null; longitude?:number|null}) {
        return StopStation.create({
            name:data.name,
            latitude: data.latitude ?? null,
            longitude: data.longitude?? null,
        });

    }

    async update(id: number, data: Partial<{ name: string; latitude:number | null; longitude: number|null; }>) {
        const [count, rows] = await StopStation.update(data, {where:{id}, returning:true});
        if(!count) throw new Error(`StopStation ${id} not found`);
        return rows[0];
    }

    async remove(id: number) {
        const deleted = await StopStation.destroy({where:{id}});
        if(!deleted) throw new Error(`StopStation ${id} Not found`);
    }
}