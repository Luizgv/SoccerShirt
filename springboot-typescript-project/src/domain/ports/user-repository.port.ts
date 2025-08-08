import { User } from '../entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  listAll(): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: number, patch: UpdateUserDTO): Promise<User>;
  updatePassword(id: number, passwordHash: string): Promise<User>;
  changeStatus(id: number, status: string): Promise<User>;
  emailExists(email: string, excludeId?: number): Promise<boolean>;
  getNextId(): Promise<number>;
}
