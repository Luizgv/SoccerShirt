import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { USER_REPOSITORY_TOKEN } from '../../../domain/tokens/tokens';
import { UserResponseDTO } from '../../../domain/dtos/user.dto';
import { UserGroup } from '../../../domain/entities/user.entity';

export interface ListUsersResult {
  success: boolean;
  users?: UserResponseDTO[];
  error?: string;
}

@Injectable()
export class ListUsersUseCase {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository) {}

  async execute(currentUserGroup: string): Promise<ListUsersResult> {
    try {
      // Verificar se usuário atual é administrador
      if (currentUserGroup !== UserGroup.ADMINISTRADOR) {
        return {
          success: false,
          error: 'Acesso negado - apenas administradores podem listar usuários',
        };
      }

      const users = await this.userRepository.listAll();
      const userDTOs = users.map(user => new UserResponseDTO(user));

      return {
        success: true,
        users: userDTOs,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao listar usuários',
      };
    }
  }
}
