export interface ITimeRepository {
    list(): Promise<any>;
    get(id: number): Promise<any | null>;
    create(data: {transportId: number; stopId: number; arrivalAt: Date;}): Promise<any>;
    update(id: number, data: Partial<{ transportId: number; stopId: number; arrivalAt: Date;}>): Promise<any>;
    remove(id: number): Promise<void>;
}


export type CreateTimeInput = {transportId: number; stopId: number; arrivalAt: Date;};
export type UpdateTimeInput = Partial< { transportId: number; stopId: number; arrivaAt: Date}>;


export class TimeService {
    constructor(private repo: ITimeRepository) {}
    list() {return this.repo.list();}
    get(id: number) {return this.repo.get(id); }
    create(data: CreateTimeInput) { return this.repo.create(data); }
    update(id: number, data: UpdateTimeInput) {return this.repo.update(id, data); }
    remove(id: number) {return this.repo.remove(id); }
}