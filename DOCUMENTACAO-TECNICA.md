# 📋 Documentação Técnica - Soccer Shirt E-commerce

## 🎯 Visão Geral do Projeto

E-commerce de camisas de futebol com arquitetura Full Stack moderna, utilizando React no frontend e Spring Boot no backend.

## 🏗️ Arquitetura do Projeto - Frontend e Backend Isolados

### 📁 Estrutura de Diretórios

```
PI-20250922T174845Z-1-001/
│
├── frontend/                    # 🎨 FRONTEND ISOLADO
│   ├── src/
│   │   ├── components/          # Componentes React reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── Filters.tsx
│   │   ├── pages/               # Páginas/Rotas da aplicação
│   │   │   ├── HomePage.tsx
│   │   │   ├── CatalogPage.tsx
│   │   │   └── ProductDetailPage.tsx
│   │   ├── services/            # Integração com API backend
│   │   │   └── api.ts
│   │   ├── types/               # Definições TypeScript
│   │   │   └── Product.ts
│   │   ├── styles/              # Estilos globais
│   │   │   └── global.css
│   │   ├── assets/              # Imagens e recursos estáticos
│   │   ├── App.tsx              # Componente raiz
│   │   └── main.tsx             # Entry point
│   ├── public/                  # Arquivos públicos estáticos
│   ├── package.json             # Dependências NPM do frontend
│   ├── vite.config.ts           # Configuração do Vite
│   ├── tsconfig.json            # Configuração TypeScript
│   └── index.html               # HTML base
│
├── src/                         # ⚙️ BACKEND ISOLADO
│   └── main/
│       ├── java/                # Código Java
│       │   └── com/soccershirt/ecommerce/
│       │       ├── application/     # Casos de uso e serviços
│       │       │   └── service/
│       │       │       └── ProductService.java
│       │       ├── domain/          # Entidades de negócio
│       │       │   ├── Product.java
│       │       │   ├── ProductCategory.java
│       │       │   ├── ProductSize.java
│       │       │   └── Size.java
│       │       ├── interfaces/      # Controllers e DTOs
│       │       │   ├── controller/
│       │       │   │   └── ProductController.java
│       │       │   └── dto/
│       │       │       ├── ProductDto.java
│       │       │       └── ProductSizeDto.java
│       │       └── SoccerShirtEcommerceApplication.java
│       └── resources/
│           └── application.yml      # Configurações do Spring Boot
│
├── scripts/                     # 🚀 Scripts de inicialização
│   ├── start-backend.bat        # Inicia backend (Windows)
│   ├── start-backend.sh         # Inicia backend (Linux/Mac)
│   ├── start-frontend.bat       # Inicia frontend (Windows)
│   └── start-frontend.sh        # Inicia frontend (Linux/Mac)
│
├── pom.xml                      # Maven - gerenciador de dependências do backend
├── start-project.bat            # Menu interativo (Windows)
├── .gitignore                   # Ignora arquivos de build e dependências
└── README.md                    # Documentação principal
```

### ✅ Princípios de Separação

#### 1. **Independência Total**
- ✅ Frontend possui seu próprio `package.json` e gerencia suas dependências via NPM
- ✅ Backend possui seu próprio `pom.xml` e gerencia suas dependências via Maven
- ✅ Cada um pode ser buildado, testado e deployado **independentemente**

#### 2. **Configurações Isoladas**
- ✅ Frontend configurado via `vite.config.ts` (porta 3000, proxy, build)
- ✅ Backend configurado via `application.yml` (porta 8080, database, logging)

#### 3. **Build Independente**
```bash
# Backend - Maven
mvn clean package
# Gera: target/soccer-shirt-ecommerce.jar

# Frontend - NPM + Vite
cd frontend && npm run build
# Gera: frontend/dist/
```

#### 4. **Comunicação via API REST**
```
┌─────────────────┐         HTTP         ┌─────────────────┐
│   Frontend      │ ───────────────────> │   Backend       │
│  React (3000)   │  /api/products       │  Spring (8080)  │
│  TypeScript     │ <─────────────────── │  Java 17        │
└─────────────────┘    JSON Response     └─────────────────┘
```

---

## 🔧 Stack Tecnológica

### **Frontend** (Isolado em `frontend/`)

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **React** | 18.2.0 | Biblioteca principal para construção da interface |
| **TypeScript** | 5.0+ | Type safety e melhor experiência de desenvolvimento |
| **React Router DOM** | 6.15.0 | Gerenciamento de rotas e navegação |
| **Vite** | 4.4.0 | Build tool ultra-rápido e servidor de desenvolvimento |
| **Axios** | 1.5.0 | Cliente HTTP para consumir APIs |
| **CSS3** | - | Estilização customizada |

**Gerenciamento de Dependências**: NPM via `frontend/package.json`

### **Backend** (Isolado em `src/`)

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **Java** | 17 | Linguagem de programação |
| **Spring Boot** | 3.2.0 | Framework principal do backend |
| **Spring Data JPA** | 3.2.0 | Persistência e acesso a dados |
| **Spring Validation** | 3.2.0 | Validação de dados |
| **H2 Database** | Runtime | Banco de dados em memória |
| **Maven** | - | Gerenciador de dependências |

**Gerenciamento de Dependências**: Maven via `pom.xml`

---

## 🚀 Como Executar (Frontend e Backend Independentes)

### **Opção 1: Scripts Automatizados (Recomendado)**

#### Windows
```bash
# Menu interativo com todas as opções
start-project.bat

# Ou diretamente
scripts\start-backend.bat   # Backend apenas
scripts\start-frontend.bat  # Frontend apenas
```

#### Linux/Mac
```bash
./scripts/start-backend.sh   # Backend apenas
./scripts/start-frontend.sh  # Frontend apenas
```

### **Opção 2: Execução Manual**

#### Backend (Spring Boot - Porta 8080)
```bash
# Na raiz do projeto
mvn spring-boot:run

# Ou com Maven Wrapper
./mvnw spring-boot:run
```

✅ **Rodando em**: `http://localhost:8080`
- API REST: `http://localhost:8080/api/products`

#### Frontend (React + Vite - Porta 3000)
```bash
# Entrar na pasta frontend
cd frontend

# Instalar dependências (primeira vez)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

✅ **Rodando em**: `http://localhost:3000`
- Interface web completa
- Proxy automático: `/api/*` → `http://localhost:8080/api/*`

### **Opção 3: Build para Produção**

#### Backend
```bash
# Gera JAR executável
mvn clean package

# Executa o JAR
java -jar target/soccer-shirt-ecommerce.jar
```

Resultado: `target/soccer-shirt-ecommerce.jar` (aplicação standalone)

#### Frontend
```bash
cd frontend
npm run build
```

Resultado: `frontend/dist/` (arquivos estáticos HTML/CSS/JS)

### **Desenvolvimento Simultâneo**

Para desenvolvimento full-stack, execute ambos em **terminais separados**:

**Terminal 1** (Backend):
```bash
scripts\start-backend.bat
```

**Terminal 2** (Frontend):
```bash
scripts\start-frontend.bat
```

---

## 🏗️ Arquitetura do Frontend (Pasta `frontend/`)

### **Estrutura de Pastas Frontend**

```
frontend/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── Header.tsx       # Cabeçalho da aplicação
│   │   ├── Footer.tsx       # Rodapé
│   │   ├── ProductCard.tsx  # Card de produto
│   │   ├── ProductGrid.tsx  # Grid de produtos
│   │   └── Filters.tsx      # Filtros de busca
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.tsx     # Página inicial
│   │   ├── CatalogPage.tsx  # Catálogo de produtos
│   │   └── ProductDetailPage.tsx  # Detalhes do produto
│   ├── services/            # Integração com backend
│   │   └── api.ts           # Cliente HTTP (Axios)
│   ├── types/               # Definições TypeScript
│   │   └── Product.ts       # Interfaces de produto
│   ├── styles/              # Estilos globais
│   │   └── global.css       # CSS global
│   ├── assets/              # Recursos estáticos
│   │   └── logo.png         # Logo da aplicação
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Entry point da aplicação
├── public/                  # Arquivos públicos
├── package.json             # Dependências NPM
├── vite.config.ts           # Configuração Vite
├── tsconfig.json            # Configuração TypeScript
└── index.html               # HTML base
```

### **Configuração do Vite** (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,                    // Porta do servidor dev
    proxy: {
      '/api': {                    // Proxy para backend
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',                // Output da build
    assetsDir: 'assets'            // Assets da build
  }
})
```

### **Integração com Backend** (`services/api.ts`)

```typescript
import axios from 'axios';

// Cliente HTTP configurado
const api = axios.create({
  baseURL: '/api',          // Usa proxy do Vite
  timeout: 10000,
});

// Serviços disponíveis
export const productService = {
  getProducts: async () => { /* ... */ },
  getProductById: async (id) => { /* ... */ },
  searchProducts: async (filters) => { /* ... */ },
  // ...
};
```

### **Gerenciamento de Estado**

- **useState**: Estado local de componentes
- **useEffect**: Efeitos colaterais (fetch de dados, etc.)
- **React Router**: Gerenciamento de rotas
- **Context API**: Estado global (se necessário)

---

## 🏗️ Arquitetura do Backend (Pasta `src/`)

### **Padrão Arquitetural: Clean Architecture + DDD**

```
src/main/java/com/soccershirt/ecommerce/
├── domain/                       # Camada de Domínio
│   ├── Product.java              # Entidade principal
│   ├── ProductCategory.java      # Enum de categorias
│   ├── ProductSize.java          # Value Object de tamanho
│   └── Size.java                 # Enum de tamanhos
│
├── application/                  # Camada de Aplicação
│   └── service/
│       └── ProductService.java   # Caso de uso de produtos
│
└── interfaces/                   # Camada de Interface
    ├── controller/
    │   └── ProductController.java  # REST Controller
    └── dto/
        ├── ProductDto.java         # DTO de produto
        └── ProductSizeDto.java     # DTO de tamanho
```

### **Camadas da Clean Architecture**

#### 1. **Domain** (Núcleo do negócio)
- **Product.java**: Entidade principal com regras de negócio
- **ProductCategory.java**: Categorias de produtos (HOME, AWAY, etc.)
- **Size.java**: Tamanhos disponíveis (S, M, L, XL, XXL)
- **ProductSize.java**: Relacionamento produto-tamanho com preço e estoque

**Responsabilidade**: Lógica de negócio pura, sem dependências externas

#### 2. **Application** (Casos de uso)
- **ProductService.java**: Orquestra operações de produtos
  - Buscar produtos com paginação
  - Filtrar por categoria, time, liga
  - Buscar produto por ID

**Responsabilidade**: Coordena o fluxo entre domínio e interfaces

#### 3. **Interfaces** (Adaptadores)
- **ProductController.java**: Endpoints REST
  - `GET /api/products` - Lista produtos
  - `GET /api/products/{id}` - Busca por ID
  - `GET /api/products/category/{category}` - Filtra por categoria
  - `GET /api/products/search` - Busca com múltiplos filtros

- **DTOs**: Transferência de dados entre camadas

**Responsabilidade**: Adapta requisições HTTP para o domínio

### **Configuração Spring Boot** (`application.yml`)

```yaml
spring:
  application:
    name: soccer-shirt-ecommerce

server:
  port: 8080

logging:
  level:
    com.soccershirt: INFO
```

### **Fluxo de Requisição**

```
1. Cliente HTTP (Frontend)
   ↓
2. ProductController.java (REST)
   ↓
3. ProductDto (Validação)
   ↓
4. ProductService.java (Caso de uso)
   ↓
5. Product.java (Entidade de domínio)
   ↓
6. Repository (Spring Data JPA)
   ↓
7. H2 Database
```

---

## 🔄 Comunicação Frontend ↔ Backend

### **Ambiente de Desenvolvimento**

```
┌─────────────────────────┐
│  Browser                │
│  http://localhost:3000  │
└───────────┬─────────────┘
            │
            │ Request: /api/products
            │
┌───────────▼─────────────┐
│  Vite Dev Server        │
│  Frontend (React)       │
│  Port: 3000             │
└───────────┬─────────────┘
            │
            │ Proxy: /api → http://localhost:8080/api
            │
┌───────────▼─────────────┐
│  Spring Boot Server     │
│  Backend (Java)         │
│  Port: 8080             │
└─────────────────────────┘
```

### **Configuração de Proxy (Desenvolvimento)**

O Vite é configurado para fazer proxy de requisições `/api/*` para o backend:

```typescript
// frontend/vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',  // Backend URL
      changeOrigin: true,                // Muda o header Origin
      secure: false,                     // Permite HTTPS self-signed
    }
  }
}
```

**Como funciona**:
1. Frontend faz requisição para `/api/products`
2. Vite intercepta e redireciona para `http://localhost:8080/api/products`
3. Backend responde com JSON
4. Frontend recebe a resposta

### **Ambiente de Produção**

Em produção, existem 3 opções de deploy:

#### **Opção 1: Deploy Separado (Recomendado)**
```
Frontend (Vercel/Netlify)  →  Backend (Heroku/AWS)
http://frontend.com        →  http://api.backend.com
```

Configuração:
```typescript
// frontend/.env.production
VITE_API_URL=https://api.backend.com/api
```

#### **Opção 2: Backend Serve Frontend**
```bash
# Build frontend
cd frontend && npm run build

# Copiar dist/ para Spring Boot
cp -r frontend/dist/* src/main/resources/static/

# Build backend
mvn clean package

# Deploy único JAR
java -jar target/soccer-shirt-ecommerce.jar
```

#### **Opção 3: Reverse Proxy (Nginx)**
```nginx
server {
    location / {
        proxy_pass http://localhost:3000;  # Frontend
    }
    location /api {
        proxy_pass http://localhost:8080;  # Backend
    }
}
```

### **Exemplos de Requisições**

#### Frontend → Backend (TypeScript)
```typescript
// frontend/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Buscar produtos
const products = await api.get('/products');

// Buscar produto por ID
const product = await api.get(`/products/${id}`);

// Buscar com filtros
const filtered = await api.get('/products/search', {
  params: { team: 'Barcelona', category: 'HOME' }
});
```

#### Backend Response (Java)
```java
// src/.../interfaces/controller/ProductController.java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @GetMapping
    public ResponseEntity<PageResponse<ProductDto>> getProducts() {
        // Retorna JSON
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        // Retorna JSON
    }
}
```

---

## 🌐 API REST (Backend)

### **Endpoints Principais**

#### Produtos
```
GET  /api/products                    # Lista todos com paginação
GET  /api/products/{id}               # Busca por ID
GET  /api/products/category/{category} # Filtra por categoria
GET  /api/products/team/{team}         # Filtra por time
GET  /api/products/search              # Busca com múltiplos filtros
GET  /api/products/catalog             # Catálogo completo
```

### **Exemplos de Uso**

```bash
# Listar produtos (paginado)
curl http://localhost:8080/api/products

# Buscar por ID
curl http://localhost:8080/api/products/1

# Buscar por categoria
curl http://localhost:8080/api/products/category/HOME

# Buscar por time
curl "http://localhost:8080/api/products/team/Real%20Madrid"

# Busca com filtros
curl "http://localhost:8080/api/products/search?team=Barcelona&category=HOME&page=0&size=10"
```

### **Formato de Resposta (JSON)**

```json
{
  "content": [
    {
      "id": 1,
      "name": "Camisa Real Madrid Home 24/25",
      "team": "Real Madrid",
      "league": "La Liga",
      "season": "2024/25",
      "description": "Camisa oficial...",
      "basePrice": 299.90,
      "category": "HOME",
      "isAvailable": true,
      "availableSizes": [
        {
          "size": "M",
          "priceModifier": 0.00,
          "stockQuantity": 15,
          "finalPrice": 299.90
        }
      ]
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 50,
  "totalPages": 5
}
```

---

## 🎨 Features Implementadas

### **Frontend** (`frontend/`)
- ✅ Interface React com TypeScript
- ✅ Navegação com React Router
- ✅ Integração com backend via Axios
- ✅ Páginas: Home, Catálogo, Detalhes do Produto
- ✅ Componentes reutilizáveis (Header, Footer, ProductCard, etc.)
- ✅ Filtros de busca (categoria, time, liga)
- ✅ Design responsivo
- ✅ Build otimizado com Vite

### **Backend** (`src/`)
- ✅ API REST com Spring Boot
- ✅ Clean Architecture (domain, application, interfaces)
- ✅ Validação de dados (Bean Validation)
- ✅ Paginação e ordenação
- ✅ Filtros múltiplos de busca
- ✅ H2 Database em memória
- ✅ CORS configurado
- ✅ Tratamento de exceções

---

## 🚀 Scripts de Inicialização

### **Windows**

#### `start-project.bat` (Menu Interativo)
```batch
[1] Iniciar Backend (Spring Boot)
[2] Iniciar Frontend (React)
[3] Abrir documentação da API (Swagger)
[4] Verificar requisitos do sistema
[5] Instalar dependências do frontend
[6] Sair
```

#### `scripts/start-backend.bat`
- Verifica Java e Maven
- Compila o projeto
- Executa `mvn spring-boot:run`
- Backend rodando em `http://localhost:8080`

#### `scripts/start-frontend.bat`
- Verifica Node.js e NPM
- Instala dependências (se necessário)
- Executa `npm run dev`
- Frontend rodando em `http://localhost:3000`

### **Linux/Mac**

#### `scripts/start-backend.sh`
```bash
#!/bin/bash
mvn spring-boot:run
```

#### `scripts/start-frontend.sh`
```bash
#!/bin/bash
cd frontend
npm install
npm run dev
```

---
|------------|------|----------------|
| **Context API** | Gerenciador de Estado Global | Estado compartilhado entre componentes (auth, cart, favorites, theme) |
| **useState** | Hook de Estado Local | Estado interno de componentes (formulários, dropdowns, seleções) |
| **useEffect** | Hook de Efeito | Sincronização com API, localStorage, eventos do DOM |
| **useContext** | Hook de Contexto | Consumir dados dos Contexts |
| **useMemo** | Hook de Memorização | Otimização de valores calculados (AuthContext) |
| **useCallback** | Hook de Memorização | Otimização de funções (ToastContext) |
| **useRef** | Hook de Referência | Referências DOM (fechar dropdowns ao clicar fora) |
| **useNavigate** | Hook do React Router | Navegação programática |
| **useLocation** | Hook do React Router | Acessar rota/query params atual |

#### **Gerenciamento Global (Context API)**

O projeto utiliza o **React Context API** para gerenciamento global de estado, organizado em 5 contextos principais:

#### **1. AuthContext** - Autenticação de Usuários
```
Responsabilidades:
- Login e logout de usuários
- Registro de novos usuários
- Persistência de sessão com JWT
- Verificação de autenticação

Hooks utilizados:
- useState: Armazenar dados do usuário
- useEffect: Carregar usuário do localStorage ao iniciar
- useMemo: Otimizar o objeto de contexto
```

#### **2. CartContext** - Carrinho de Compras
```
Responsabilidades:
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Atualizar quantidades
- Contador de itens no carrinho
- Sincronização com backend

Hooks utilizados:
- useState: Gerenciar itens e contador do carrinho
- useEffect: Sincronizar com backend quando usuário muda
```

#### **3. FavoritesContext** - Lista de Favoritos
```
Responsabilidades:
- Adicionar/remover favoritos
- Listar produtos favoritos
- Contador de favoritos
- Verificar se produto está favoritado

Hooks utilizados:
- useState: Armazenar lista de favoritos
- useEffect: Buscar favoritos ao fazer login
```

#### **4. ThemeContext** - Tema da Aplicação
```
Responsabilidades:
- Alternar entre modo claro/escuro
- Persistência de preferência (localStorage)
- Detecção automática de preferência do sistema

Hooks utilizados:
- useState: Controlar tema atual (dark/light)
- useEffect: Aplicar tema no DOM e persistir no localStorage
- useEffect: Escutar mudanças na preferência do sistema
```

#### **5. ToastContext** - Notificações
```
Responsabilidades:
- Exibir notificações de sucesso
- Exibir notificações de erro
- Exibir notificações de aviso
- Gerenciar múltiplas notificações

Hooks utilizados:
- useState: Gerenciar array de notificações ativas
- useCallback: Otimizar funções showToast e removeToast
```

---

### **Hooks em Componentes**

#### **Exemplo: Header.jsx**
```javascript
// Estados locais do componente
const [showUserMenu, setShowUserMenu] = useState(false)
const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false)
const [selectedSizes, setSelectedSizes] = useState({})

// Consumindo contexts
const { user, logout } = useAuth()
const { cartCount, addToCart } = useCart()
const { isDarkMode, toggleTheme } = useTheme()
const { favorites, toggleFavorite, favoritesCount } = useFavorites()

// Navegação
const nav = useNavigate()
const location = useLocation()

// Referências DOM
const userMenuRef = useRef(null)
const favoritesRef = useRef(null)

// Efeito: Fechar dropdowns ao clicar fora
useEffect(() => {
  function handleClickOutside(event) {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])
```

### **Estrutura de Pastas Frontend**

```
src/
├── api/
│   └── client.js          # Cliente HTTP (fetch API)
├── components/
│   ├── Header.jsx         # Cabeçalho da aplicação
│   ├── Footer.jsx         # Rodapé
│   └── Toast.jsx          # Componente de notificação
├── contexts/              # Gerenciadores de estado global
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── FavoritesContext.jsx
│   ├── ThemeContext.jsx
│   └── ToastContext.jsx
├── pages/                 # Páginas da aplicação
│   ├── Home.jsx
│   ├── Product.jsx
│   ├── Cart.jsx
│   ├── Favorites.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── About.jsx
│   └── Success.jsx
├── App.jsx               # Componente raiz
└── main.jsx              # Ponto de entrada
```

---

## 🏗️ Arquitetura do Backend

### **Padrão Arquitetural: MVC + Repository Pattern**

```
src/main/java/com/soccershirt/
├── model/                 # Entidades JPA
│   ├── User.java
│   ├── Product.java
│   ├── CartItem.java
│   ├── Favorite.java
│   ├── Order.java
│   └── Coupon.java
├── repository/            # Camada de acesso a dados
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   ├── CartItemRepository.java
│   ├── FavoriteRepository.java
│   ├── OrderRepository.java
│   └── CouponRepository.java
├── controller/            # Controllers REST
│   ├── AuthRestController.java
│   ├── ProductRestController.java
│   ├── CartRestController.java
│   ├── FavoriteRestController.java
│   └── CouponRestController.java
├── dto/                   # Data Transfer Objects
│   ├── LoginDTO.java
│   ├── RegisterDTO.java
│   ├── TokenDTO.java
│   └── CheckoutDTO.java
├── security/              # Configurações de segurança
│   ├── JwtService.java
│   └── JwtAuthFilter.java
├── config/                # Configurações da aplicação
│   ├── SecurityConfig.java
│   └── DataLoader.java
└── ApiApplication.java    # Classe principal
```

---

## 🔐 Segurança e Autenticação

### **Fluxo de Autenticação JWT**

```
1. Usuário faz login (email + senha)
2. Backend valida credenciais
3. Backend gera token JWT
4. Frontend armazena token no localStorage
5. Requisições incluem token no header Authorization
6. Backend valida token em cada requisição protegida
```

### **Tecnologias de Segurança**

- **Spring Security**: Framework de segurança
- **JWT (io.jsonwebtoken)**: Tokens de autenticação
- **BCrypt**: Hash de senhas
- **CORS**: Configurado para permitir requisições do frontend

---

## 🌐 API REST

### **Endpoints Principais**

#### Autenticação
```
POST /api/auth/login       # Login
POST /api/auth/register    # Registro
GET  /api/auth/me          # Dados do usuário logado
```

#### Produtos
```
GET /api/products          # Listar todos
GET /api/products/{id}     # Buscar por ID
```

#### Carrinho
```
GET    /api/cart           # Listar itens
POST   /api/cart/{id}      # Adicionar produto
DELETE /api/cart/{id}      # Remover produto
PUT    /api/cart/{id}      # Atualizar quantidade
```

#### Favoritos
```
GET    /api/favorites      # Listar favoritos
POST   /api/favorites/{id} # Adicionar/remover favorito
```

#### Cupons
```
POST /api/coupons/validate # Validar cupom
```

---

## 💾 Banco de Dados

### **H2 Database (Em Memória)**

```
Características:
- Banco de dados relacional em memória
- Ideal para desenvolvimento e testes
- Console web disponível em /h2-console
- Dados iniciais carregados via DataLoader
```

### **Entidades Principais**

```
Users          # Usuários do sistema
Products       # Catálogo de produtos
Cart_Items     # Itens no carrinho
Favorites      # Produtos favoritos
Orders         # Pedidos finalizados
Coupons        # Cupons de desconto
```

---

## 🎨 Features Implementadas

### **Frontend**
- ✅ Sistema de autenticação completo
- ✅ Gerenciamento de carrinho de compras
- ✅ Sistema de favoritos
- ✅ Tema claro/escuro
- ✅ Notificações toast
- ✅ Navegação por categorias (Nacional/Internacional)
- ✅ Dropdown de favoritos no header
- ✅ Seleção de tamanhos de produtos
- ✅ Design responsivo

### **Backend**
- ✅ Autenticação JWT
- ✅ CRUD de produtos
- ✅ Gerenciamento de carrinho
- ✅ Sistema de favoritos
- ✅ Sistema de cupons
- ✅ Processamento de pedidos
- ✅ Validação de dados
- ✅ Tratamento de exceções
- ✅ CORS configurado

---

## 🚀 Inicialização do Projeto

### **Backend**
```bash
cd PI/soccershirt-springboot-api-v2
mvn spring-boot:run
# Servidor: http://localhost:8080
```

### **Frontend**
```bash
cd PI/soccershirt-react-api-v2
npm install
npm run dev
# Servidor: http://localhost:5173
```

---

## 📊 Diferenciais Técnicos

### **Arquitetura**
- ✅ **Frontend e Backend Completamente Isolados**: Cada um com suas próprias dependências e configurações
- ✅ **Clean Architecture**: Separação clara de responsabilidades (domain, application, interfaces)
- ✅ **Domain-Driven Design**: Entidades de domínio com regras de negócio
- ✅ **RESTful API**: Endpoints seguindo padrões REST
- ✅ **Type Safety**: TypeScript no frontend para maior segurança

### **Frontend**
- ✅ **React 18** com TypeScript
- ✅ **Vite** para build ultra-rápido (3-5x mais rápido que Webpack)
- ✅ **Hot Module Replacement**: Mudanças refletidas instantaneamente
- ✅ **Axios** com interceptors para logs e tratamento de erros
- ✅ **Componentes Reutilizáveis**: ProductCard, ProductGrid, Filters, etc.
- ✅ **CSS puro** sem frameworks CSS (menos dependências)
- ✅ **Proxy de desenvolvimento** configurado no Vite

### **Backend**
- ✅ **Spring Boot 3.2**: Framework moderno e robusto
- ✅ **Java 17**: LTS com recursos modernos (records, pattern matching, etc.)
- ✅ **Spring Data JPA**: Queries automáticas e paginação
- ✅ **Bean Validation**: Validação declarativa de dados
- ✅ **H2 Database**: Banco em memória para desenvolvimento rápido
- ✅ **Maven**: Gerenciamento de dependências confiável
- ✅ **Clean Architecture**: Código testável e manutenível

### **DevOps**
- ✅ **Build Independente**: Frontend e backend podem ser buildados separadamente
- ✅ **Scripts Automatizados**: Windows (.bat) e Linux/Mac (.sh)
- ✅ **Menu Interativo**: `start-project.bat` para facilitar desenvolvimento
- ✅ **Hot Reload**: Ambos com reload automático em desenvolvimento
- ✅ **Deploy Flexível**: Múltiplas opções de deploy (separado, junto, nginx)

---

## 🔄 Fluxo de Dados Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUÁRIO                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
│                    Port: 3000                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Pages      │  │  Components  │  │   Services   │          │
│  │ HomePage.tsx │◄─┤ProductCard.tsx│◄─┤   api.ts     │          │
│  └──────────────┘  └──────────────┘  └──────┬───────┘          │
└───────────────────────────────────────────────┼──────────────────┘
                                                │
                          HTTP Request (JSON)   │
                          GET /api/products     │
                                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                         │
│                    Port: 8080                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  ProductController.java (REST)                           │   │
│  │  Valida requisição, retorna ProductDto                   │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │  ProductService.java (Application)                       │   │
│  │  Orquestra lógica de negócio                            │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │  Product.java (Domain)                                   │   │
│  │  Entidades com regras de negócio                        │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │  Repository (Spring Data JPA)                            │   │
│  │  Acesso a dados                                         │   │
│  └────────────────────────┬─────────────────────────────────┘   │
└───────────────────────────┼──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    H2 DATABASE                                   │
│                    In-Memory                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💾 Banco de Dados

### **H2 Database (Em Memória)**

```
Características:
- Banco de dados relacional em memória
- Ideal para desenvolvimento e testes
- Dados iniciais carregados automaticamente
- Dados resetam a cada restart (não persistente)
```

### **Entidades Principais**

```
Products          # Catálogo de produtos
├── id            # ID único
├── name          # Nome do produto
├── team          # Time (Real Madrid, Barcelona, etc.)
├── league        # Liga (La Liga, Premier League, etc.)
├── season        # Temporada (2024/25)
├── description   # Descrição
├── basePrice     # Preço base
├── category      # Categoria (HOME, AWAY, THIRD, etc.)
└── isAvailable   # Disponibilidade

ProductSizes      # Tamanhos por produto
├── id            # ID único
├── productId     # FK para Products
├── size          # Tamanho (S, M, L, XL, XXL)
├── priceModifier # Modificador de preço (+10, +20)
├── stockQuantity # Quantidade em estoque
└── isAvailable   # Disponibilidade
```

---

## 📝 Observações Técnicas

### **Por que Frontend e Backend Separados?**

#### ✅ **Vantagens**
1. **Desenvolvimento Independente**: Times frontend e backend podem trabalhar em paralelo
2. **Deploy Independente**: Atualizar frontend sem rebuild do backend e vice-versa
3. **Escalabilidade**: Escalar frontend e backend separadamente conforme demanda
4. **Tecnologias Específicas**: Cada um usa as melhores ferramentas (Vite vs Maven)
5. **Manutenção**: Código mais organizado e fácil de manter
6. **Reutilização**: Backend pode servir múltiplos frontends (web, mobile, etc.)
7. **Deploy Flexível**: Pode deployar em servidores diferentes ou juntos

#### 📦 **Estrutura de Dependências**
```
frontend/
├── package.json       # Dependências NPM (React, TypeScript, Vite, etc.)
└── node_modules/      # Instaladas via npm install

backend/
├── pom.xml            # Dependências Maven (Spring Boot, JPA, etc.)
└── target/            # Build via mvn package
```

### **Por que Vite?**
- ⚡ **3-5x mais rápido** que Create React App
- 🔥 **Hot Module Replacement** instantâneo
- 📦 **Build otimizado** com Rollup
- 🛠️ **Zero configuração** para React + TypeScript
- 🔌 **Proxy integrado** para backend

### **Por que H2?**
- 🚀 **Desenvolvimento rápido** (zero configuração)
- 🔧 **Não requer instalação** de banco externo
- 🧪 **Ideal para testes** e protótipos
- 📝 **Dados resetam** a cada restart (sempre limpo)
- 🔄 **Fácil migração** para PostgreSQL/MySQL em produção

### **Por que Clean Architecture?**
- ✅ **Testabilidade**: Camadas independentes são fáceis de testar
- ✅ **Manutenibilidade**: Código organizado e fácil de entender
- ✅ **Flexibilidade**: Trocar implementações sem afetar o domínio
- ✅ **Escalabilidade**: Adicionar features sem quebrar código existente
- ✅ **Independência**: Domain não depende de frameworks

---

## 🛠️ Troubleshooting

### **Backend não inicia**
```bash
# Verificar Java
java -version  # Deve ser 17+

# Verificar Maven
mvn -version

# Limpar e recompilar
mvn clean install

# Verificar porta 8080
netstat -an | findstr :8080  # Windows
lsof -i :8080                # Linux/Mac
```

### **Frontend não inicia**
```bash
# Verificar Node.js
node --version  # Deve ser 18+

# Verificar NPM
npm --version

# Limpar cache e reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm install

# Verificar porta 3000
netstat -an | findstr :3000  # Windows
lsof -i :3000                # Linux/Mac
```

### **Frontend não conecta com Backend**
1. Verificar se backend está rodando em `http://localhost:8080`
2. Verificar proxy no `frontend/vite.config.ts`
3. Verificar CORS no backend (deve permitir localhost:3000)
4. Abrir console do browser (F12) e verificar erros de rede

---

**Desenvolvido com foco em simplicidade, manutenibilidade, independência e boas práticas de desenvolvimento.**

---

## 📚 Recursos Adicionais

- **Spring Boot Docs**: https://spring.io/projects/spring-boot
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **TypeScript Docs**: https://www.typescriptlang.org
- **Clean Architecture**: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

