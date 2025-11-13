export interface IStopRepository {
  list(): Promise<any[]>; 
  get(id: number): Promise<any | null>;
  create(data: CreateStopInput): Promise<any>;
  update(id: number, data: UpdateStopInput): Promise<any>;
  remove(id: number): Promise<void>;
}


export type CreateStopInput = {
  name: string;
  latitude?: number | null| undefined;
  longitude?: number | null|undefined;
};


export type UpdateStopInput = {
  name?: string;
  latitude?: number | null| undefined;
  longitude?: number | null| undefined;
};

export class StopService {
  constructor(private repo: IStopRepository) {}

  list() {
    return this.repo.list();
  }

  get(id: number) {
    return this.repo.get(id);
  }

  create(data: CreateStopInput) {
    return this.repo.create(data);
  }

  update(id: number, data: UpdateStopInput) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
