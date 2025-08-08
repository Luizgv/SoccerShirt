import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { AuthService } from '../../../domain/ports/auth-service.port';
import { SessionService } from '../../../domain/ports/session-service.port';
import { LoginDTO } from '../../../domain/dtos/user.dto';
import { UserGroup } from '../../../domain/entities/user.entity';
import { 
  USER_REPOSITORY_TOKEN,
  AUTH_SERVICE_TOKEN,
  SESSION_SERVICE_TOKEN
} from '../../../domain/tokens/tokens';

export interface LoginResult {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    group: string;
    status: string;
  };
  error?: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository,
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    @Inject(SESSION_SERVICE_TOKEN) private readonly sessionService: SessionService,
  ) {}

  async execute(loginData: LoginDTO): Promise<LoginResult> {
    try {
      // Buscar usuário por email
      const user = await this.userRepository.findByEmail(loginData.email);
      
      if (!user) {
        return {
          success: false,
          error: 'Email ou senha inválidos',
        };
      }

      // Verificar se é usuário de backoffice (não é CLIENTE)
      if (user.group !== UserGroup.ADMINISTRADOR && user.group !== UserGroup.ESTOQUISTA) {
        return {
          success: false,
          error: 'Acesso negado - apenas usuários de backoffice podem fazer login',
        };
      }

      // Verificar se usuário está ativo
      if (!user.isActive()) {
        return {
          success: false,
          error: 'Usuário desativado - contate o administrador',
        };
      }

      // Verificar senha
      const isPasswordValid = await this.authService.comparePassword(
        loginData.password,
        user.passwordHash,
      );

      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Email ou senha inválidos',
        };
      }

      // Gerar token de sessão
      const token = await this.sessionService.generateToken(user);

      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          group: user.group,
          status: user.status,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro interno do servidor',
      };
    }
  }
}
