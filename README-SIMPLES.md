# ⚽ Soccer Shirt E-commerce - Versão Simplificada

## 🚀 Como executar

### Pré-requisitos
- Java 17+
- Maven
- Node.js 18+
- NPM

### Execução rápida
```bash
# Windows
.\start-dev.bat

# Ou manualmente:
# Terminal 1 - Backend
mvn spring-boot:run

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## 📍 URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api/products

## 🎯 O que foi simplificado
- ❌ Removido banco de dados (H2/JPA)
- ❌ Removido Swagger/OpenAPI
- ❌ Removido MapStruct
- ❌ Removido profiles complexos
- ❌ Removido Actuator
- ✅ Dados em memória (List/Map)
- ✅ Controller simples
- ✅ Configuração mínima
- ✅ Script único para iniciar tudo

## 📦 Estrutura atual
```
src/main/java/com/soccershirt/ecommerce/
├── application/service/ProductService.java    # Dados em memória
├── domain/                                    # Objetos de domínio
├── interfaces/
│   ├── controller/ProductController.java      # REST API simples
│   └── dto/                                   # DTOs
└── SoccerShirtEcommerceApplication.java       # Main class
```

## 🔧 Tecnologias
- **Backend**: Spring Boot 3.2 + Java 17
- **Frontend**: React 18 + TypeScript + Vite
- **Dados**: Em memória (sem banco)
