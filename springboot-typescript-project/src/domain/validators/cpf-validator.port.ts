export interface CpfValidator {
  validate(cpf: string): boolean;
  format(cpf: string): string;
}
