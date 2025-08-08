import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { USER_REPOSITORY_TOKEN } from '../../../domain/tokens/tokens';
import { UserResponseDTO } from '../../../domain/dtos/user.dto';
import { UserGroup, UserStatus } from '../../../domain/entities/user.entity';

export interface ChangeUserStatusResult {
  success: boolean;
  user?: UserResponseDTO;
  error?: string;
}

@Injectable()
export class ChangeUserStatusUseCase {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository) {}

  async execute(
    userId: number,
    newStatus: UserStatus,
    currentUserGroup: string,
  ): Promise<ChangeUserStatusResult> {
    try {
      // Verificar se usuário atual é administrador
      if (currentUserGroup !== UserGroup.ADMINISTRADOR) {
        return {
          success: false,
          error: 'Acesso negado - apenas administradores podem alterar status de usuários',
        };
      }

      // Verificar se usuário existe
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        return {
          success: false,
          error: 'Usuário não encontrado',
        };
      }

      // Atualizar status
      const updatedUser = await this.userRepository.changeStatus(userId, newStatus);

      return {
        success: true,
        user: new UserResponseDTO(updatedUser),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao alterar status do usuário',
      };
    }
  }
}
