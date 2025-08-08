# 🛠️ Guia de Desenvolvimento

## 📋 Histórias de Usuário Implementadas

### ✅ 1. Login (Usuário não logado)
**Como** usuário de backoffice (Administrador ou Estoquista)  
**Eu quero** me identificar no sistema  
**Para que** eu possa entrar no backoffice

**Critérios de aceite:**
- ✅ Login apenas com email/senha válidos
- ✅ Bloqueio para usuários não autorizados (CLIENTE)
- ✅ Verificação de status ativo
- ✅ Rate limiting (5 tentativas por minuto)
- ✅ Geração de token JWT

### ✅ 2. Listar Usuários (Administrador)
**Como** Administrador  
**Eu posso** listar usuários  
**Para que** acesse incluir/alterar/habilitar-desabilitar

**Critérios de aceite:**
- ✅ Acesso restrito a Administradores
- ✅ Listagem completa com dados do usuário
- ✅ Interface tabular responsiva

### ✅ 3. Cadastrar Usuário (Administrador)
**Como** Administrador  
**Eu quero** incluir um acesso ao backoffice  
**Para que** o novo usuário utilize o sistema

**Critérios de aceite:**
- ✅ Validação de CPF e email
- ✅ Verificação de email único
- ✅ Hash seguro da senha (bcrypt)
- ✅ Status inicial ATIVO
- ✅ Confirmação antes de salvar

### ✅ 4. Escolher Opção de Edição (Administrador)
**Como** Administrador  
**Eu quero** escolher a operação sobre um usuário  
**Para que** possa alterar dados, senha ou status

**Critérios de aceite:**
- ✅ Botões de ação para cada usuário
- ✅ Opções: Editar, Alterar Senha, Ativar/Desativar

### ✅ 5. Alterar Usuário (Administrador)
**Como** Administrador  
**Eu quero** alterar dados do usuário  
**Para que** mantenha os registros atualizados

**Critérios de aceite:**
- ✅ Edição de nome, CPF e grupo
- ✅ Email não editável (chave única)
- ✅ Validação de dados
- ✅ Confirmação antes de salvar

### ✅ 6. Alterar Senha (Administrador)
**Como** Administrador  
**Eu quero** alterar a senha de um usuário  
**Para que** garanta segurança de acesso

**Critérios de aceite:**
- ✅ Formulário específico para senha
- ✅ Hash seguro (bcrypt)
- ✅ Confirmação da alteração

### ✅ 7. Ativar/Desativar Usuário (Administrador)
**Como** Administrador  
**Eu quero** conceder ou remover acesso  
**Para que** controle o uso do backoffice

**Critérios de aceite:**
- ✅ Toggle de status ATIVO/DESATIVADO
- ✅ Confirmação da ação
- ✅ Bloqueio automático de login para desativados

## 🏗️ Arquitetura Implementada

### Camadas da Aplicação

1. **Domain (Domínio)**
   - `entities/` - Entidades de negócio
   - `dtos/` - Data Transfer Objects
   - `ports/` - Interfaces (abstrações)
   - `validators/` - Validadores de domínio

2. **Application (Aplicação)**
   - `use-cases/` - Casos de uso (regras de negócio)

3. **Infrastructure (Infraestrutura)**
   - `adapters/` - Implementações das interfaces

4. **Presentation (Apresentação)**
   - `controllers/` - Endpoints REST
   - `guards/` - Autenticação e autorização
   - `pipes/` - Validação de dados

### Princípios Seguidos

- ✅ **Dependency Inversion** - Dependência de abstrações, não implementações
- ✅ **Single Responsibility** - Cada classe tem uma responsabilidade
- ✅ **Open/Closed** - Aberto para extensão, fechado para modificação
- ✅ **Interface Segregation** - Interfaces específicas e coesas
- ✅ **Don't Repeat Yourself** - Reutilização de código

## 🔒 Segurança Implementada

### Autenticação
- ✅ JWT com expiração configurável
- ✅ bcrypt para hash de senhas (10 rounds)
- ✅ Rate limiting (5 tentativas/minuto)
- ✅ Validação de grupos de usuário

### Autorização
- ✅ Guards para rotas protegidas
- ✅ Verificação de grupos (ADMINISTRADOR/ESTOQUISTA)
- ✅ Bloqueio de usuários desativados

### Validação
- ✅ class-validator para DTOs
- ✅ Validação de CPF (algoritmo correto)
- ✅ Validação de email
- ✅ Sanitização de entradas

### Headers de Segurança
- ✅ Helmet.js para headers seguros
- ✅ CORS configurado
- ✅ CSP (Content Security Policy)

## 🧪 Testes

### Estrutura de Testes
```
src/
└── application/
    └── use-cases/
        └── auth/
            └── login.use-case.spec.ts
```

### Cobertura Atual
- ✅ LoginUseCase - casos de sucesso e falha
- ✅ Mocks para todas as dependências
- ✅ Testes seguindo padrão AAA

### Para Executar
```bash
npm test                # Todos os testes
npm run test:watch      # Modo watch
npm run test:cov        # Com coverage
```

## 🔄 Persistência

### Atual: In-Memory
- ✅ InMemoryUserRepositoryAdapter
- ✅ Dados perdidos a cada reinicialização
- ✅ Seed automático do usuário admin

### Futuro: Banco de Dados
```typescript
// Exemplo de extensão futura
{
  provide: UserRepository,
  useClass: process.env.PERSISTENCE_DRIVER === 'prisma' 
    ? PrismaUserRepositoryAdapter 
    : InMemoryUserRepositoryAdapter,
}
```

## 🎨 Interface Web

### Características
- ✅ Design responsivo e moderno
- ✅ JavaScript vanilla (sem frameworks)
- ✅ Validação client-side
- ✅ Feedback visual para ações
- ✅ Máscaras de entrada (CPF)

### Funcionalidades
- ✅ Login com credenciais pré-preenchidas
- ✅ Dashboard com navegação
- ✅ CRUD completo de usuários
- ✅ Listagem de produtos (placeholder)
- ✅ Modais para criação/edição

## 📦 Estrutura de Arquivos

```
├── src/
│   ├── domain/
│   │   ├── entities/user.entity.ts
│   │   ├── dtos/user.dto.ts
│   │   ├── ports/
│   │   └── validators/
│   ├── application/
│   │   └── use-cases/
│   ├── infrastructure/
│   │   └── adapters/
│   ├── presentation/
│   │   ├── controllers/
│   │   ├── guards/
│   │   └── pipes/
│   ├── app.module.ts
│   └── main.ts
├── public/
│   ├── index.html
│   └── app.js
├── scripts/
│   ├── start.sh
│   └── start.bat
└── README.md
```

## 🚀 Próximos Passos

### Melhorias de Segurança
- [ ] Criptografia no cliente (AES-GCM)
- [ ] Logs de auditoria
- [ ] Refresh tokens
- [ ] 2FA (Two-Factor Authentication)

### Funcionalidades
- [ ] Gestão de produtos completa
- [ ] Relatórios e dashboards
- [ ] Importação/exportação de dados
- [ ] Histórico de alterações

### Infraestrutura
- [ ] PostgreSQL + Prisma
- [ ] Docker containers
- [ ] CI/CD pipeline
- [ ] Monitoramento e logs

### Testes
- [ ] Testes E2E
- [ ] Testes de performance
- [ ] Testes de segurança
- [ ] Coverage 100%

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de dependências**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Erro de compilação TypeScript**
   ```bash
   npm run build
   ```

3. **Problemas de CORS**
   - Verificar configuração no main.ts
   - Ajustar origins conforme necessário

4. **Login não funciona**
   - Verificar se o seed foi executado
   - Confirmar credenciais: gustavo.nscto@gmail.com / 1234

### Debug

```bash
# Modo debug
npm run start:debug

# Logs detalhados
DEBUG=* npm run start:dev
```

## 👥 Contribuição

1. Fork o repositório
2. Crie branch para feature: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra Pull Request

### Padrões de Código
- TypeScript strict mode
- ESLint + Prettier
- Testes obrigatórios para novos features
- Documentação atualizada
