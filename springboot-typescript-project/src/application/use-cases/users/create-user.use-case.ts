import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { AuthService } from '../../../domain/ports/auth-service.port';
import { CpfValidator } from '../../../domain/validators/cpf-validator.port';
import { EmailValidator } from '../../../domain/validators/email-validator.port';
import { USER_REPOSITORY_TOKEN, AUTH_SERVICE_TOKEN, CPF_VALIDATOR_TOKEN, EMAIL_VALIDATOR_TOKEN } from '../../../domain/tokens/tokens';
import { CreateUserDTO, UserResponseDTO } from '../../../domain/dtos/user.dto';
import { UserGroup } from '../../../domain/entities/user.entity';

export interface CreateUserResult {
  success: boolean;
  user?: UserResponseDTO;
  error?: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository,
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    @Inject(CPF_VALIDATOR_TOKEN) private readonly cpfValidator: CpfValidator,
    @Inject(EMAIL_VALIDATOR_TOKEN) private readonly emailValidator: EmailValidator,
  ) {}

  async execute(userData: CreateUserDTO, currentUserGroup: string): Promise<CreateUserResult> {
    try {
      // Verificar se usuário atual é administrador
      if (currentUserGroup !== UserGroup.ADMINISTRADOR) {
        return {
          success: false,
          error: 'Acesso negado - apenas administradores podem criar usuários',
        };
      }

      // Validar CPF
      if (!this.cpfValidator.validate(userData.cpf)) {
        return {
          success: false,
          error: 'CPF inválido',
        };
      }

      // Validar email
      if (!this.emailValidator.validate(userData.email)) {
        return {
          success: false,
          error: 'Email inválido',
        };
      }

      // Verificar se email já existe
      const emailExists = await this.userRepository.emailExists(userData.email);
      if (emailExists) {
        return {
          success: false,
          error: 'Email já está em uso',
        };
      }

      // Hash da senha
      const passwordHash = await this.authService.hashPassword(userData.password);

      // Criar usuário
      const newUserData = {
        ...userData,
        cpf: this.cpfValidator.format(userData.cpf),
      };

      const user = await this.userRepository.create(newUserData);
      
      // Atualizar com hash da senha
      const userWithPassword = await this.userRepository.updatePassword(user.id, passwordHash);

      return {
        success: true,
        user: new UserResponseDTO(userWithPassword),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar usuário',
      };
    }
  }
}
