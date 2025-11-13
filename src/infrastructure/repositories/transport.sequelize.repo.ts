import { Transport } from "../models/transport.model";

export class TransportSequelizeRepository {
    list() {return Transport.findAll(); }
    get(id: number) {return Transport.findByPk(id); }
    create(data: {name:string; type: number; syndicateId?: number | null; ownderId?: number| null;}) {
        return Transport.create({
            name: data.name,
            type: data.type,
            syndicateId: data.syndicateId ?? null,
            ownerId: data.ownderId ?? null,
        });
    }
    async update(id: number, data: Partial<{name: string; type: number; syndicateId: number | null; ownerId: number | null}>) {
        const [count, rows] = await Transport.update(data, {where: {id}, returning: true});
        if(!count) throw new Error(`Transport${id}not found`);
        return rows[0];

    }

    async remove(id: number) {
        const deleted = await Transport.destroy({where:{id}});
        if (!deleted) throw new Error(`Transport${id}not found`);
    }
}