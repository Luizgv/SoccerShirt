export interface CryptoService {
  encrypt(text: string, key: string): Promise<string>;
  decrypt(encryptedText: string, key: string): Promise<string>;
}
