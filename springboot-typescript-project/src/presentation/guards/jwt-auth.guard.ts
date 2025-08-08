import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { SessionService } from '../../domain/ports/session-service.port';
import { SESSION_SERVICE_TOKEN } from '../../domain/tokens/tokens';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(SESSION_SERVICE_TOKEN) private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de acesso requerido');
    }

    try {
      const payload = await this.sessionService.verifyToken(token);
      
      if (!payload) {
        throw new UnauthorizedException('Token inválido');
      }

      // Verificar se usuário está ativo
      if (payload.status !== 'ATIVO') {
        throw new UnauthorizedException('Usuário desativado');
      }

      // Anexar dados do usuário à requisição
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
