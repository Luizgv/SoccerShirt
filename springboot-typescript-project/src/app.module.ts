import { Module, Inject } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Controllers
import { AuthController } from './presentation/controllers/auth.controller';
import { UsersController } from './presentation/controllers/users.controller';
import { ProductsController } from './presentation/controllers/products.controller';

// Use Cases
import { LoginUseCase } from './application/use-cases/auth/login.use-case';
import { ListUsersUseCase } from './application/use-cases/users/list-users.use-case';
import { CreateUserUseCase } from './application/use-cases/users/create-user.use-case';
import { GetUserUseCase } from './application/use-cases/users/get-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/users/update-user.use-case';
import { UpdatePasswordUseCase } from './application/use-cases/users/update-password.use-case';
import { ChangeUserStatusUseCase } from './application/use-cases/users/change-user-status.use-case';

// Adapters
import { InMemoryUserRepositoryAdapter } from './infrastructure/adapters/in-memory-user-repository.adapter';
import { BcryptAuthServiceAdapter } from './infrastructure/adapters/bcrypt-auth-service.adapter';
import { JwtSessionServiceAdapter } from './infrastructure/adapters/jwt-session-service.adapter';
import { CpfValidatorAdapter } from './infrastructure/adapters/cpf-validator.adapter';
import { EmailValidatorAdapter } from './infrastructure/adapters/email-validator.adapter';

// Ports
import { UserRepository } from './domain/ports/user-repository.port';
import { AuthService } from './domain/ports/auth-service.port';
import { SessionService } from './domain/ports/session-service.port';
import { CpfValidator } from './domain/validators/cpf-validator.port';
import { EmailValidator } from './domain/validators/email-validator.port';

// Tokens
import { 
  USER_REPOSITORY_TOKEN,
  AUTH_SERVICE_TOKEN,
  SESSION_SERVICE_TOKEN,
  CPF_VALIDATOR_TOKEN,
  EMAIL_VALIDATOR_TOKEN
} from './domain/tokens/tokens';

// Guards
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';

@Module({
  imports: [
    // JWT Configuration
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
    
    // Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.RATE_LIMIT_TTL || '60') * 1000,
      limit: parseInt(process.env.RATE_LIMIT_MAX || '5'),
    }]),

    // Serve Static Files (for UI)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    
    // Serve Static Images
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'main', 'typescript', 'public'),
      serveRoot: '/main/typescript/public',
    }),
  ],
  controllers: [AuthController, UsersController, ProductsController],
  providers: [
    // Use Cases
    LoginUseCase,
    ListUsersUseCase,
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    UpdatePasswordUseCase,
    ChangeUserStatusUseCase,

    // Guards
    JwtAuthGuard,

    // Adapters (Implementations)
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: InMemoryUserRepositoryAdapter,
    },
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: BcryptAuthServiceAdapter,
    },
    {
      provide: SESSION_SERVICE_TOKEN,
      useClass: JwtSessionServiceAdapter,
    },
    {
      provide: CPF_VALIDATOR_TOKEN,
      useClass: CpfValidatorAdapter,
    },
    {
      provide: EMAIL_VALIDATOR_TOKEN,
      useClass: EmailValidatorAdapter,
    },
  ],
})
export class AppModule {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: UserRepository,
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
  ) {
    this.initializeAdminUser();
  }

  private async initializeAdminUser(): Promise<void> {
    try {
      // Gerar hash correto para a senha "1234"
      const adminPasswordHash = await this.authService.hashPassword('1234');
      
      // Atualizar o usuário admin com o hash correto
      if (this.userRepository instanceof InMemoryUserRepositoryAdapter) {
        await this.userRepository.updateAdminPassword(adminPasswordHash);
      }
    } catch (error) {
      console.error('Erro ao inicializar usuário administrador:', error);
    }
  }
}
