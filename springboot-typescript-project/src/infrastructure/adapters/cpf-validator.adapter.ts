import { Injectable } from '@nestjs/common';
import { CpfValidator } from '../../domain/validators/cpf-validator.port';

@Injectable()
export class CpfValidatorAdapter implements CpfValidator {
  validate(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleanCpf = cpf.replace(/\D/g, '');

    // Verifica se tem 11 dígitos
    if (cleanCpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCpf)) {
      return false;
    }

    // Calcula os dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
    }
    let checkDigit1 = 11 - (sum % 11);
    if (checkDigit1 >= 10) checkDigit1 = 0;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    let checkDigit2 = 11 - (sum % 11);
    if (checkDigit2 >= 10) checkDigit2 = 0;

    // Verifica se os dígitos calculados correspondem aos dígitos do CPF
    return (
      checkDigit1 === parseInt(cleanCpf.charAt(9)) &&
      checkDigit2 === parseInt(cleanCpf.charAt(10))
    );
  }

  format(cpf: string): string {
    // Remove caracteres não numéricos
    const cleanCpf = cpf.replace(/\D/g, '');
    
    // Formata como XXX.XXX.XXX-XX
    return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
