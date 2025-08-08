import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { AuthService } from '../../../domain/ports/auth-service.port';
import { USER_REPOSITORY_TOKEN, AUTH_SERVICE_TOKEN } from '../../../domain/tokens/tokens';
import { UpdatePasswordDTO, UserResponseDTO } from '../../../domain/dtos/user.dto';
import { UserGroup } from '../../../domain/entities/user.entity';

export interface UpdatePasswordResult {
  success: boolean;
  user?: UserResponseDTO;
  error?: string;
}

@Injectable()
export class UpdatePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository,
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
  ) {}

  async execute(
    userId: number,
    passwordData: UpdatePasswordDTO,
    currentUserGroup: string,
  ): Promise<UpdatePasswordResult> {
    try {
      // Verificar se usuário atual é administrador
      if (currentUserGroup !== UserGroup.ADMINISTRADOR) {
        return {
          success: false,
          error: 'Acesso negado - apenas administradores podem alterar senhas',
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

      // Hash da nova senha
      const newPasswordHash = await this.authService.hashPassword(passwordData.newPassword);

      // Atualizar senha
      const updatedUser = await this.userRepository.updatePassword(userId, newPasswordHash);

      return {
        success: true,
        user: new UserResponseDTO(updatedUser),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar senha',
      };
    }
  }
}
