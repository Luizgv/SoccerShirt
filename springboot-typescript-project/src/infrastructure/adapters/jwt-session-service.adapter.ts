import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/entities/user.entity';
import { SessionService, SessionPayload } from '../../domain/ports/session-service.port';

@Injectable()
export class JwtSessionServiceAdapter implements SessionService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload: SessionPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      group: user.group,
      status: user.status,
    };

    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<SessionPayload | null> {
    try {
      const payload = this.jwtService.verify(token);
      return payload as SessionPayload;
    } catch (error) {
      return null;
    }
  }
}
