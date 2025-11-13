import { where } from "sequelize";
import { Time } from "../models/time.model";


export class TimeSequelizeRepository {
    list() {return Time.findAll(); }
    get(id:number) {return Time.findByPk(id); }
    create(data: {transportId: number; stopId: number; arrivalAt: Date;}) {
        return Time.create({
            transportId: data.transportId,
            stopId: data.stopId,
            arrivalAt: data.arrivalAt,
        });
    }
    async update(id:number, data: Partial<{transportId: number; stopId:number; arrivalAt: Date}>) {
        const[count, rows] = await Time.update(data, {where: {id}, returning: true});
        if(!count) throw new Error(`Time ${id} not found`);
        return rows[0];


    }
    async remove(id: number) {
        const deleted = await Time.destroy({where: {id}});
        if (!deleted) throw new Error(`Time ${id} not found`);
    }

}