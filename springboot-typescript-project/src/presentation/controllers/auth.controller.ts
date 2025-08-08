import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { LoginDTO } from '../../domain/dtos/user.dto';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: LoginDTO) {
    if (!loginData.email || !loginData.password) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }

    const result = await this.loginUseCase.execute(loginData);

    if (!result.success) {
      throw new UnauthorizedException(result.error);
    }

    return {
      message: 'Login realizado com sucesso',
      token: result.token,
      user: result.user,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    // Em uma implementação real, aqui poderíamos invalidar o token no servidor
    // Por enquanto, apenas retornamos uma resposta de sucesso
    return {
      message: 'Logout realizado com sucesso',
    };
  }
}
