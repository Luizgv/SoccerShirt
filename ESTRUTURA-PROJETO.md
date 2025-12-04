# 📁 Estrutura do Projeto - Frontend e Backend Isolados

## ✅ Configuração Concluída

O projeto **Soccer Shirt E-commerce** está agora totalmente configurado com **frontend e backend completamente isolados e independentes**.

---

## 🎯 Estrutura Implementada

```
PI-20250922T174845Z-1-001/
│
├── 🎨 frontend/                    # TODO O FRONTEND ISOLADO
│   ├── src/
│   │   ├── components/             # Componentes React reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── Filters.tsx
│   │   ├── pages/                  # Páginas da aplicação
│   │   │   ├── HomePage.tsx
│   │   │   ├── CatalogPage.tsx
│   │   │   └── ProductDetailPage.tsx
│   │   ├── services/               # Integração com API
│   │   │   └── api.ts
│   │   ├── types/                  # Definições TypeScript
│   │   │   └── Product.ts
│   │   ├── styles/                 # Estilos CSS
│   │   │   └── global.css
│   │   ├── assets/                 # Recursos estáticos
│   │   │   └── logo.png
│   │   ├── App.tsx                 # Componente raiz
│   │   └── main.tsx                # Entry point
│   ├── public/                     # Arquivos públicos
│   ├── package.json                # ✅ Dependências NPM
│   ├── vite.config.ts              # ✅ Configuração Vite
│   ├── tsconfig.json               # ✅ Configuração TypeScript
│   └── index.html                  # HTML base
│
├── ⚙️ src/                         # TODO O BACKEND ISOLADO
│   └── main/
│       ├── java/com/soccershirt/ecommerce/
│       │   ├── application/        # Casos de uso
│       │   │   └── service/
│       │   │       └── ProductService.java
│       │   ├── domain/             # Entidades de negócio
│       │   │   ├── Product.java
│       │   │   ├── ProductCategory.java
│       │   │   ├── ProductSize.java
│       │   │   └── Size.java
│       │   ├── interfaces/         # Controllers e DTOs
│       │   │   ├── controller/
│       │   │   │   └── ProductController.java
│       │   │   └── dto/
│       │   │       ├── ProductDto.java
│       │   │       └── ProductSizeDto.java
│       │   └── SoccerShirtEcommerceApplication.java
│       └── resources/
│           └── application.yml     # ✅ Configuração Spring Boot
│
├── 🚀 scripts/                     # Scripts de inicialização
│   ├── start-backend.bat           # Inicia apenas backend
│   ├── start-backend.sh            # Inicia apenas backend (Linux/Mac)
│   ├── start-frontend.bat          # Inicia apenas frontend
│   └── start-frontend.sh           # Inicia apenas frontend (Linux/Mac)
│
├── 📄 pom.xml                      # ✅ Dependências Maven (backend)
├── 📄 start-project.bat            # Menu interativo
├── 📄 .gitignore                   # ✅ Configurado para ambos
├── 📄 README.md                    # ✅ Documentação atualizada
├── 📄 DOCUMENTACAO-TECNICA.md      # ✅ Documentação técnica atualizada
└── 📄 ESTRUTURA-PROJETO.md         # Este arquivo
```

---

## ✅ Separação Frontend/Backend

### **1. Dependências Isoladas**

#### Frontend (`frontend/package.json`)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "axios": "^1.5.0",
    "typescript": "^5.0.0"
  }
}
```
- Gerenciado via **NPM**
- Instalação: `cd frontend && npm install`

#### Backend (`pom.xml`)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- ... outras dependências Spring Boot -->
</dependencies>
```
- Gerenciado via **Maven**
- Instalação: `mvn clean install`

### **2. Configurações Isoladas**

#### Frontend (`frontend/vite.config.ts`)
```typescript
export default defineConfig({
  server: {
    port: 3000,                    // Porta independente
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',                // Build independente
  }
})
```

#### Backend (`src/main/resources/application.yml`)
```yaml
server:
  port: 8080                       # Porta independente

spring:
  application:
    name: soccer-shirt-ecommerce
```

### **3. Build Independente**

#### Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

#### Backend
```bash
mvn clean package
# Output: target/soccer-shirt-ecommerce.jar
```

---

## 🚀 Como Executar

### **Opção 1: Menu Interativo (Windows)**
```bash
start-project.bat
```
Escolha:
- [1] Iniciar Backend
- [2] Iniciar Frontend
- [4] Verificar requisitos
- [5] Instalar dependências

### **Opção 2: Scripts Individuais**

#### Backend apenas
```bash
# Windows
scripts\start-backend.bat

# Linux/Mac
./scripts/start-backend.sh

# Ou manualmente
mvn spring-boot:run
```
✅ **Rodando em**: `http://localhost:8080`

#### Frontend apenas
```bash
# Windows
scripts\start-frontend.bat

# Linux/Mac
./scripts/start-frontend.sh

# Ou manualmente
cd frontend
npm install  # Primeira vez
npm run dev
```
✅ **Rodando em**: `http://localhost:3000`

### **Opção 3: Desenvolvimento Full-Stack**

**Terminal 1** (Backend):
```bash
scripts\start-backend.bat
```

**Terminal 2** (Frontend):
```bash
scripts\start-frontend.bat
```

Ambos rodando simultaneamente e comunicando via HTTP!

---

## 🔄 Comunicação Frontend ↔ Backend

### **Desenvolvimento**
```
Browser (localhost:3000)
    │
    │ Request: GET /api/products
    ▼
Vite Dev Server (3000)
    │
    │ Proxy: /api → http://localhost:8080/api
    ▼
Spring Boot Server (8080)
    │
    │ Response: JSON
    ▼
Frontend recebe dados
```

### **Produção - Opções**

#### 1. Deploy Separado
- Frontend: Vercel, Netlify, AWS S3
- Backend: Heroku, AWS EC2, Railway

#### 2. Backend serve Frontend
```bash
cd frontend && npm run build
cp -r frontend/dist/* src/main/resources/static/
mvn clean package
java -jar target/soccer-shirt-ecommerce.jar
```

#### 3. Reverse Proxy (Nginx)
```nginx
location / { proxy_pass http://localhost:3000; }
location /api { proxy_pass http://localhost:8080; }
```

---

## ✅ Configurações Atualizadas

### 1. **pom.xml** (Backend)
- ✅ Build configurado com `finalName`
- ✅ Compiler plugin configurado para Java 17
- ✅ Spring Boot plugin com mainClass especificada

### 2. **README.md**
- ✅ Estrutura do projeto documentada
- ✅ Instruções de execução independente
- ✅ Exemplos de build e deploy
- ✅ Comunicação frontend/backend explicada

### 3. **DOCUMENTACAO-TECNICA.md**
- ✅ Arquitetura separada documentada
- ✅ Fluxo de dados completo
- ✅ Configurações de proxy explicadas
- ✅ Guia de troubleshooting

### 4. **.gitignore**
- ✅ Frontend: `node_modules/`, `dist/`, `.vite/`
- ✅ Backend: `target/`, `.class`, `.jar`
- ✅ IDE: `.idea/`, `.vscode/`
- ✅ OS: `.DS_Store`, `Thumbs.db`

### 5. **Scripts**
- ✅ `start-backend.bat` - Verifica Java/Maven, compila e executa
- ✅ `start-frontend.bat` - Verifica Node/NPM, instala deps e executa
- ✅ `start-project.bat` - Menu interativo completo

---

## 📊 Portas e URLs

| Serviço | Porta | URL | Descrição |
|---------|-------|-----|-----------|
| Frontend Dev | 3000 | http://localhost:3000 | Interface React |
| Backend API | 8080 | http://localhost:8080 | REST API |
| API Endpoint | 8080 | http://localhost:8080/api/products | Produtos |

---

## 🎯 Benefícios da Separação

✅ **Desenvolvimento Independente**: Times frontend e backend trabalham em paralelo
✅ **Deploy Independente**: Atualizar um sem afetar o outro
✅ **Escalabilidade**: Escalar frontend e backend separadamente
✅ **Tecnologias Específicas**: Vite para frontend, Maven para backend
✅ **Manutenção**: Código organizado e fácil de manter
✅ **Reutilização**: Backend pode servir múltiplos clientes (web, mobile, etc.)
✅ **Flexibilidade**: Deploy em servidores diferentes ou juntos

---

## 🔧 Tecnologias

### Frontend
- React 18.2.0
- TypeScript 5.0+
- Vite 4.4.0
- React Router DOM 6.15.0
- Axios 1.5.0

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven

---

## ✅ Checklist de Implementação

- [x] Frontend isolado em `frontend/`
- [x] Backend isolado em `src/`
- [x] Dependências separadas (package.json e pom.xml)
- [x] Configurações separadas (vite.config.ts e application.yml)
- [x] Build independente configurado
- [x] Scripts de inicialização criados
- [x] Proxy configurado para desenvolvimento
- [x] .gitignore configurado para ambos
- [x] README.md atualizado
- [x] DOCUMENTACAO-TECNICA.md atualizado
- [x] pom.xml otimizado

---

## 📚 Próximos Passos

1. **Desenvolvimento**: Use os scripts para iniciar frontend e backend
2. **Testes**: Adicione testes unitários e de integração
3. **CI/CD**: Configure pipeline de deploy automático
4. **Produção**: Escolha estratégia de deploy (separado ou junto)
5. **Monitoramento**: Adicione logs e métricas

---

**Estrutura concluída e pronta para desenvolvimento! 🚀**

Para mais informações:
- Ver `README.md` para guia de uso
- Ver `DOCUMENTACAO-TECNICA.md` para detalhes técnicos

