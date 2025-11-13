import { User } from "../models/user.model.js";

// Esta interfaz define lo que el repositorio debe hacer (CRUD)
export class UserSequelizeRepository {
  // Listar todos los usuarios
  async list() {
    return User.findAll();
  }

  // Buscar usuario por ID
  async get(id: number) {
    return User.findByPk(id);
  }

  // Crear un nuevo usuario
  async create(data: {
    email: string;
    fullName: string;
    role?: string;
    passwordHash?: string | null;
  }) {
    return User.create({
      email: data.email,
      fullName: data.fullName,
      role: data.role || "user",
      passwordHash: data.passwordHash || null,
    });
  }

  // Actualizar datos de un usuario existente
  async update(id: number, data: Partial<{
    email: string;
    fullName: string;
    role: string;
    passwordHash: string | null;
  }>) {
    const [count, rows] = await User.update(data, {
      where: { id },
      returning: true,
    });
    if (count === 0) throw new Error(`User ${id} not found`);
    return rows[0];
  }

  // Eliminar usuario por ID
  async remove(id: number) {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) throw new Error(`User ${id} not found`);
  }
}
