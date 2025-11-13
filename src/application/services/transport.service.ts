import type {TransportType} from "../../domain/entities/transportType";



export interface ITransportRepository {
    list() : Promise<any[]>;
    get(id: number): Promise<any | null>;
    create(data: {name: string; type: TransportType; SyndicateId?: number | null; ownerId?: number | null; }): Promise<any>;
    update(id: number, data: Partial<{ name: string; type: TransportType; SyndicateId: number| null; ownerId: number | null; }>): Promise<any>;
    remove(id: number): Promise<void>;
}