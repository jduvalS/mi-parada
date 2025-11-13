

export interface IUserRepository {
  list(): Promise<any[]>;
  get(id: number): Promise<any | null>;
  create(data: {
    email: string;
    fullName: string;
    role?: string;
    passwordHash?: string | null;
  }): Promise<any>;
  update(id: number, data: Partial<{
    email: string; fullName: string; role: string; passwordHash: string | null;
  }>): Promise<any>;
  remove(id: number): Promise<void>;
}

export type CreateUserInput = {
  email: string;
  fullName: string;
  role?: string;
  passwordHash?: string | null;
};

export type UpdateUserInput = Partial<{
  email: string;
  fullName: string;
  role: string;
  passwordHash: string | null;
}>;

export class UserService {
  constructor(private repo: IUserRepository) {}
  list() { return this.repo.list(); }
  get(id: number) { return this.repo.get(id); }
  create(data: CreateUserInput) {
    return this.repo.create({
      email: data.email,
      fullName: data.fullName,
      role: data.role ?? "user",
      passwordHash: data.passwordHash ?? null,
    });
  }
  update(id: number, data: UpdateUserInput) { return this.repo.update(id, data); }
  remove(id: number) { return this.repo.remove(id); }
}
