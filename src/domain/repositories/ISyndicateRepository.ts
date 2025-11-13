import type { Syndicate } from "../../infrastructure/models/syndicate.model"

export interface initSyndicateRepository{
    list(): Promise<Syndicate[]>;
    get(id: number): Promise<Syndicate | null>;
    create(data: {name: string}): Promise<Syndicate>;
    update(id:number, name:string): Promise<Syndicate>;
    remove(id: number): Promise<void>;

}