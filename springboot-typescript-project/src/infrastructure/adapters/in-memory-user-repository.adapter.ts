import { Injectable } from '@nestjs/common';
import { User, UserGroup, UserStatus } from '../../domain/entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../../domain/dtos/user.dto';
import { UserRepository } from '../../domain/ports/user-repository.port';

@Injectable()
export class InMemoryUserRepositoryAdapter implements UserRepository {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    // Seed com usuário administrador inicial
    this.seedInitialUser();
  }

  private seedInitialUser(): void {
    // Hash correto para senha "1234" gerado com bcrypt rounds=10
    const adminUser = User.create(
      1,
      'Gustavo Nascimento',
      '111.111.111-11',
      'gustavo.nscto@gmail.com',
      '$2b$10$YourActualHashHere', // Este será substituído pelo hash real no bootstrap
      UserGroup.ADMINISTRADOR,
    );
    this.users.push(adminUser);
    this.nextId = 2;
  }

  // Método para atualizar o hash da senha do admin após o bootstrap
  async updateAdminPassword(passwordHash: string): Promise<void> {
    const adminIndex = this.users.findIndex(u => u.email === 'gustavo.nscto@gmail.com');
    if (adminIndex !== -1) {
      const admin = this.users[adminIndex];
      this.users[adminIndex] = admin.update(undefined, undefined, undefined, passwordHash);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  async listAll(): Promise<User[]> {
    return [...this.users];
  }

  async create(data: CreateUserDTO): Promise<User> {
    const id = this.nextId++;
    const user = User.create(
      id,
      data.name,
      data.cpf,
      data.email,
      '', // Password hash será definido pelo use case
      data.group,
    );
    this.users.push(user);
    return user;
  }

  async update(id: number, patch: UpdateUserDTO): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const existingUser = this.users[userIndex];
    const updatedUser = existingUser.update(
      patch.name,
      patch.cpf,
      patch.group,
    );

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async updatePassword(id: number, passwordHash: string): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const existingUser = this.users[userIndex];
    const updatedUser = existingUser.update(
      undefined,
      undefined,
      undefined,
      passwordHash,
    );

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async changeStatus(id: number, status: string): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const existingUser = this.users[userIndex];
    const updatedUser = existingUser.changeStatus(status as UserStatus);

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async emailExists(email: string, excludeId?: number): Promise<boolean> {
    return this.users.some(u => u.email === email && u.id !== excludeId);
  }

  async getNextId(): Promise<number> {
    return this.nextId;
  }
}
