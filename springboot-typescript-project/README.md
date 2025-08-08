# 📱 Backoffice - E-commerce Eletrônicos

Sistema de backoffice para gestão de e-commerce de eletrônicos com autenticação, controle de acesso por grupos e gestão de usuários.

## 🏗️ Arquitetura

O projeto segue os princípios da **Arquitetura Hexagonal (Ports & Adapters)** e **Clean Architecture**:

```
src/
├── domain/               # Domínio (Entities, DTOs, Ports)
│   ├── entities/        # Entidades de negócio
│   ├── dtos/           # Data Transfer Objects
│   ├── ports/          # Interfaces (abstrações)
│   └── validators/     # Validadores de domínio
├── application/        # Casos de Uso
│   └── use-cases/     # Regras de negócio
├── infrastructure/    # Adaptadores externos
│   └── adapters/     # Implementações das interfaces
└── presentation/     # Controllers e Guards
    ├── controllers/  # Endpoints REST
    ├── guards/      # Autenticação e autorização
    └── pipes/       # Validação de dados
```

## 🚀 Tecnologias

- **Backend**: Node.js + NestJS + TypeScript
- **Autenticação**: JWT + bcrypt
- **Validação**: class-validator + class-transformer
- **Segurança**: Helmet + Rate Limiting
- **Testes**: Jest
- **UI**: HTML + CSS + JavaScript (Vanilla)

## 📋 Funcionalidades

### 🔐 Autenticação
- [x] Login com email/senha
- [x] JWT para gerenciamento de sessão
- [x] Rate limiting (5 tentativas por minuto)
- [x] Validação de grupos (ADMINISTRADOR, ESTOQUISTA)
- [x] Bloqueio de usuários desativados

### 👥 Gestão de Usuários (Apenas Administradores)
- [x] Listar usuários
- [x] Criar usuário
- [x] Editar dados do usuário
- [x] Alterar senha
- [x] Ativar/Desativar usuário
- [x] Validação de CPF e email

### 📦 Produtos
- [x] Listar produtos (placeholder)
- [x] Acesso para todos os usuários logados

## 🏃‍♂️ Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente (opcional)
# As variáveis já possuem valores padrão

# 3. Compilar o TypeScript
npm run build

# 4. Iniciar a aplicação
npm run start
```

### Desenvolvimento
```bash
# Modo de desenvolvimento (com hot reload)
npm run start:dev
```

### Testes
```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:cov

# Executar testes em modo watch
npm run test:watch
```

## 🔑 Credenciais Padrão

**Administrador do Sistema:**
- Email: `gustavo.nscto@gmail.com`
- Senha: `1234`

## 🌐 Endpoints da API

### Autenticação
```
POST /api/auth/login
```

### Usuários (Apenas Administradores)
```
GET    /api/users           # Listar usuários
POST   /api/users           # Criar usuário
GET    /api/users/:id       # Buscar usuário
PUT    /api/users/:id       # Atualizar usuário
PUT    /api/users/:id/password  # Alterar senha
PATCH  /api/users/:id/status    # Ativar/Desativar
```

### Produtos
```
GET    /api/products        # Listar produtos
```

## 🎨 Interface Web

Acesse: `http://localhost:3000`

- Interface moderna e responsiva
- Gestão completa de usuários
- Visualização de produtos
- Formulários validados
- Mensagens de feedback

## 🔧 Configuração

### Variáveis de Ambiente
```env
PERSISTENCE_DRIVER=memory    # Tipo de persistência
SESSION_STRATEGY=jwt         # Estratégia de sessão
JWT_SECRET=your-secret-key   # Chave secreta JWT
JWT_EXPIRES_IN=1d           # Tempo de expiração
BCRYPT_ROUNDS=10            # Rounds do bcrypt
RATE_LIMIT_TTL=60           # TTL do rate limit (segundos)
RATE_LIMIT_MAX=5            # Máximo de tentativas
PORT=3000                   # Porta da aplicação
```

## 🧪 Estrutura de Testes

```
src/
└── application/
    └── use-cases/
        └── auth/
            └── login.use-case.spec.ts  # Testes de login
```

Os testes seguem o padrão AAA (Arrange, Act, Assert) e utilizam mocks para as dependências.

## 🔄 Persistência

Atualmente utiliza **persistência em memória** (InMemoryUserRepository), mas a arquitetura está preparada para plugar facilmente um banco de dados real:

```typescript
// Exemplo futuro: PrismaUserRepository
{
  provide: UserRepository,
  useClass: process.env.PERSISTENCE_DRIVER === 'prisma' 
    ? PrismaUserRepositoryAdapter 
    : InMemoryUserRepositoryAdapter,
}
```

## 📝 Próximos Passos

- [ ] Integração com PostgreSQL + Prisma
- [ ] Criptografia no cliente (AES-GCM)
- [ ] Logs de auditoria
- [ ] Testes E2E
- [ ] Dockerização
- [ ] CI/CD Pipeline

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
