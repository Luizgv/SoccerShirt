import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ListUsersUseCase } from '../../application/use-cases/users/list-users.use-case';
import { CreateUserUseCase } from '../../application/use-cases/users/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/users/get-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/users/update-user.use-case';
import { UpdatePasswordUseCase } from '../../application/use-cases/users/update-password.use-case';
import { ChangeUserStatusUseCase } from '../../application/use-cases/users/change-user-status.use-case';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UpdatePasswordDTO,
} from '../../domain/dtos/user.dto';
import { UserStatus } from '../../domain/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
    private readonly changeUserStatusUseCase: ChangeUserStatusUseCase,
  ) {}

  @Get()
  async listUsers(@Request() req) {
    const result = await this.listUsersUseCase.execute(req.user.group);

    if (!result.success) {
      throw new ForbiddenException(result.error);
    }

    return {
      message: 'Usuários listados com sucesso',
      users: result.users,
    };
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO, @Request() req) {
    const result = await this.createUserUseCase.execute(userData, req.user.group);

    if (!result.success) {
      if (result.error?.includes('Acesso negado')) {
        throw new ForbiddenException(result.error);
      }
      throw new BadRequestException(result.error);
    }

    return {
      message: 'Usuário criado com sucesso',
      user: result.user,
    };
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const result = await this.getUserUseCase.execute(id, req.user.group);

    if (!result.success) {
      if (result.error?.includes('Acesso negado')) {
        throw new ForbiddenException(result.error);
      }
      if (result.error?.includes('não encontrado')) {
        throw new NotFoundException(result.error);
      }
      throw new BadRequestException(result.error);
    }

    return {
      message: 'Usuário encontrado',
      user: result.user,
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateUserDTO,
    @Request() req,
  ) {
    const result = await this.updateUserUseCase.execute(id, updateData, req.user.group);

    if (!result.success) {
      if (result.error?.includes('Acesso negado')) {
        throw new ForbiddenException(result.error);
      }
      if (result.error?.includes('não encontrado')) {
        throw new NotFoundException(result.error);
      }
      throw new BadRequestException(result.error);
    }

    return {
      message: 'Usuário atualizado com sucesso',
      user: result.user,
    };
  }

  @Put(':id/password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() passwordData: UpdatePasswordDTO,
    @Request() req,
  ) {
    const result = await this.updatePasswordUseCase.execute(id, passwordData, req.user.group);

    if (!result.success) {
      if (result.error?.includes('Acesso negado')) {
        throw new ForbiddenException(result.error);
      }
      if (result.error?.includes('não encontrado')) {
        throw new NotFoundException(result.error);
      }
      throw new BadRequestException(result.error);
    }

    return {
      message: 'Senha alterada com sucesso',
      user: result.user,
    };
  }

  @Patch(':id/status')
  async changeUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: UserStatus,
    @Request() req,
  ) {
    if (!Object.values(UserStatus).includes(status)) {
      throw new BadRequestException('Status deve ser ATIVO ou DESATIVADO');
    }

    const result = await this.changeUserStatusUseCase.execute(id, status, req.user.group);

    if (!result.success) {
      if (result.error?.includes('Acesso negado')) {
        throw new ForbiddenException(result.error);
      }
      if (result.error?.includes('não encontrado')) {
        throw new NotFoundException(result.error);
      }
      throw new BadRequestException(result.error);
    }

    return {
      message: 'Status do usuário alterado com sucesso',
      user: result.user,
    };
  }
}
