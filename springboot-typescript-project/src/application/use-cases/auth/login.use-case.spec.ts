import { LoginUseCase } from './login.use-case';
import { UserRepository } from '../../../domain/ports/user-repository.port';
import { AuthService } from '../../../domain/ports/auth-service.port';
import { SessionService } from '../../../domain/ports/session-service.port';
import { User, UserGroup, UserStatus } from '../../../domain/entities/user.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let authService: jest.Mocked<AuthService>;
  let sessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      listAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updatePassword: jest.fn(),
      changeStatus: jest.fn(),
      emailExists: jest.fn(),
      getNextId: jest.fn(),
    };

    authService = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    };

    sessionService = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(),
    };

    useCase = new LoginUseCase(userRepository, authService, sessionService);
  });

  describe('execute', () => {
    it('should login successfully with valid credentials', async () => {
      // Arrange
      const loginData = {
        email: 'admin@test.com',
        password: 'password123',
      };

      const user = new User(
        1,
        'Admin User',
        '12345678901',
        'admin@test.com',
        'hashedPassword',
        UserGroup.ADMINISTRADOR,
        UserStatus.ATIVO,
        new Date(),
        new Date(),
      );

      userRepository.findByEmail.mockResolvedValue(user);
      authService.comparePassword.mockResolvedValue(true);
      sessionService.generateToken.mockResolvedValue('token123');

      // Act
      const result = await useCase.execute(loginData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.token).toBe('token123');
      expect(result.user).toEqual({
        id: 1,
        name: 'Admin User',
        email: 'admin@test.com',
        group: 'ADMINISTRADOR',
        status: 'ATIVO',
      });
      expect(userRepository.findByEmail).toHaveBeenCalledWith('admin@test.com');
      expect(authService.comparePassword).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(sessionService.generateToken).toHaveBeenCalledWith(user);
    });

    it('should fail login with invalid email', async () => {
      // Arrange
      const loginData = {
        email: 'invalid@test.com',
        password: 'password123',
      };

      userRepository.findByEmail.mockResolvedValue(null);

      // Act
      const result = await useCase.execute(loginData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Email ou senha inválidos');
      expect(result.token).toBeUndefined();
      expect(result.user).toBeUndefined();
    });

    it('should fail login with invalid password', async () => {
      // Arrange
      const loginData = {
        email: 'admin@test.com',
        password: 'wrongpassword',
      };

      const user = new User(
        1,
        'Admin User',
        '12345678901',
        'admin@test.com',
        'hashedPassword',
        UserGroup.ADMINISTRADOR,
        UserStatus.ATIVO,
        new Date(),
        new Date(),
      );

      userRepository.findByEmail.mockResolvedValue(user);
      authService.comparePassword.mockResolvedValue(false);

      // Act
      const result = await useCase.execute(loginData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Email ou senha inválidos');
    });

    it('should fail login for inactive user', async () => {
      // Arrange
      const loginData = {
        email: 'admin@test.com',
        password: 'password123',
      };

      const user = new User(
        1,
        'Admin User',
        '12345678901',
        'admin@test.com',
        'hashedPassword',
        UserGroup.ADMINISTRADOR,
        UserStatus.DESATIVADO,
        new Date(),
        new Date(),
      );

      userRepository.findByEmail.mockResolvedValue(user);

      // Act
      const result = await useCase.execute(loginData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Usuário desativado - contate o administrador');
    });
  });
});
