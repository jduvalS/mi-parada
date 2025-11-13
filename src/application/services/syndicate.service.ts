


export interface ISyndicateRepository{
    list(): Promise<any[]>;
    get(id: number): Promise<any | null>;
    create(name: string): Promise<any>;
    update(id: number, name: string): Promise<any>;
    remove(id: number): Promise<void>; 
}








export class SyndicateService{
    constructor(private repo: ISyndicateRepository) {}
    list() {return this.repo.list(); }
    get(id:number) {return this.repo.get(id);}
    create(name:string){return this.repo.create(name);}
    update(id:number, name:string){return this.repo.update(id, name);}
    remove(id:number) {return this.repo.remove(id);}
}