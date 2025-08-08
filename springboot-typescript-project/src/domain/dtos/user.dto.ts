import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserGroup } from '../entities/user.entity';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString({ message: 'CPF deve ser uma string' })
  cpf: string;

  @IsEmail({}, { message: 'Email deve ter formato válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsEnum(UserGroup, { message: 'Grupo deve ser ADMINISTRADOR ou ESTOQUISTA' })
  group: UserGroup;
}

export class UpdateUserDTO {
  @IsString({ message: 'Nome deve ser uma string' })
  name?: string;

  @IsString({ message: 'CPF deve ser uma string' })
  cpf?: string;

  @IsEnum(UserGroup, { message: 'Grupo deve ser ADMINISTRADOR ou ESTOQUISTA' })
  group?: UserGroup;
}

export class UpdatePasswordDTO {
  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  newPassword: string;
}

export class LoginDTO {
  @IsEmail({}, { message: 'Email deve ter formato válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}

export class UserResponseDTO {
  id: number;
  name: string;
  cpf: string;
  email: string;
  group: UserGroup;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.cpf = user.cpf;
    this.email = user.email;
    this.group = user.group;
    this.status = user.status;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
