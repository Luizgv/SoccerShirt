import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { CpfValidator } from '../../../domain/validators/cpf-validator.port';
import { USER_REPOSITORY_TOKEN, CPF_VALIDATOR_TOKEN } from '../../../domain/tokens/tokens';
import { UpdateUserDTO, UserResponseDTO } from '../../../domain/dtos/user.dto';
import { UserGroup } from '../../../domain/entities/user.entity';

export interface UpdateUserResult {
  success: boolean;
  user?: UserResponseDTO;
  error?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository,
    @Inject(CPF_VALIDATOR_TOKEN) private readonly cpfValidator: CpfValidator,
  ) {}

  async execute(
    userId: number,
    updateData: UpdateUserDTO,
    currentUserGroup: string,
  ): Promise<UpdateUserResult> {
    try {
      // Verificar se usuário atual é administrador
      if (currentUserGroup !== UserGroup.ADMINISTRADOR) {
        return {
          success: false,
          error: 'Acesso negado - apenas administradores podem alterar usuários',
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

      // Validar CPF se fornecido
      if (updateData.cpf && !this.cpfValidator.validate(updateData.cpf)) {
        return {
          success: false,
          error: 'CPF inválido',
        };
      }

      // Formatar CPF se fornecido
      const formattedUpdateData = {
        ...updateData,
        cpf: updateData.cpf ? this.cpfValidator.format(updateData.cpf) : undefined,
      };

      // Atualizar usuário
      const updatedUser = await this.userRepository.update(userId, formattedUpdateData);

      return {
        success: true,
        user: new UserResponseDTO(updatedUser),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar usuário',
      };
    }
  }
}
