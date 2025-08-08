import { Injectable } from '@nestjs/common';
import { EmailValidator } from '../../domain/validators/email-validator.port';

@Injectable()
export class EmailValidatorAdapter implements EmailValidator {
  validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
