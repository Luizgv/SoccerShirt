import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { USER_REPOSITORY_TOKEN } from '../../../domain/tokens/tokens';
import { UserResponseDTO } from '../../../domain/dtos/user.dto';
import { UserGroup } from '../../../domain/entities/user.entity';

export interface GetUserResult {
  success: boolean;
  user?: UserResponseDTO;
  error?: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository) {}

  async execute(userId: number, currentUserGroup: string): Promise<GetUserResult> {
    try {
      // Verificar se usuário atual é administrador
      if (currentUserGroup !== UserGroup.ADMINISTRADOR) {
        return {
          success: false,
          error: 'Acesso negado - apenas administradores podem visualizar usuários',
        };
      }

      const user = await this.userRepository.findById(userId);
      
      if (!user) {
        return {
          success: false,
          error: 'Usuário não encontrado',
        };
      }

      return {
        success: true,
        user: new UserResponseDTO(user),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao buscar usuário',
      };
    }
  }
}
