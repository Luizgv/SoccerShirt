export enum UserGroup {
  ADMINISTRADOR = 'ADMINISTRADOR',
  ESTOQUISTA = 'ESTOQUISTA',
}

export enum UserStatus {
  ATIVO = 'ATIVO',
  DESATIVADO = 'DESATIVADO',
}

export class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly cpf: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly group: UserGroup,
    public readonly status: UserStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    id: number,
    name: string,
    cpf: string,
    email: string,
    passwordHash: string,
    group: UserGroup,
  ): User {
    const now = new Date();
    return new User(
      id,
      name,
      cpf,
      email,
      passwordHash,
      group,
      UserStatus.ATIVO,
      now,
      now,
    );
  }

  update(
    name?: string,
    cpf?: string,
    group?: UserGroup,
    passwordHash?: string,
  ): User {
    return new User(
      this.id,
      name ?? this.name,
      cpf ?? this.cpf,
      this.email,
      passwordHash ?? this.passwordHash,
      group ?? this.group,
      this.status,
      this.createdAt,
      new Date(),
    );
  }

  changeStatus(status: UserStatus): User {
    return new User(
      this.id,
      this.name,
      this.cpf,
      this.email,
      this.passwordHash,
      this.group,
      status,
      this.createdAt,
      new Date(),
    );
  }

  isActive(): boolean {
    return this.status === UserStatus.ATIVO;
  }

  isAdmin(): boolean {
    return this.group === UserGroup.ADMINISTRADOR;
  }
}
