import { User } from '../entities/user.entity';

export interface SessionPayload {
  id: number;
  name: string;
  email: string;
  group: string;
  status: string;
}

export interface SessionService {
  generateToken(user: User): Promise<string>;
  verifyToken(token: string): Promise<SessionPayload | null>;
}
