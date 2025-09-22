# 🚀 Instalação no Windows - Soccer Shirt E-commerce

Este guia irá ajudá-lo a configurar e executar o projeto Soccer Shirt E-commerce no Windows.

## 📋 Pré-requisitos

### 1. Java 17+
**Download:** https://www.oracle.com/java/technologies/downloads/
- Baixe e instale o Java Development Kit (JDK) 17 ou superior
- Adicione o Java ao PATH do Windows
- Verifique a instalação: `java -version`

### 2. Maven 3.6+
**Download:** https://maven.apache.org/download.cgi
- Baixe o Maven Binary (apache-maven-X.X.X-bin.zip)
- Extraia para uma pasta (ex: C:\tools\maven)
- Adicione `C:\tools\maven\bin` ao PATH do Windows
- Verifique a instalação: `mvn -version`

### 3. Node.js 18+
**Download:** https://nodejs.org/
- Baixe e instale a versão LTS do Node.js
- O NPM será instalado automaticamente
- Verifique a instalação:
  - `node --version`
  - `npm --version`

### 4. Git (Opcional)
**Download:** https://git-scm.com/download/win
- Para clonar o repositório

## 🔧 Configuração do PATH no Windows

### Para Java e Maven:
1. Abra o **Painel de Controle**
2. Vá em **Sistema e Segurança > Sistema**
3. Clique em **Configurações avançadas do sistema**
4. Clique em **Variáveis de Ambiente**
5. Em **Variáveis do Sistema**, encontre e edite **Path**
6. Adicione os caminhos:
   - Java: `C:\Program Files\Java\jdk-17\bin` (ajuste conforme sua instalação)
   - Maven: `C:\tools\maven\bin` (ajuste conforme sua instalação)

## 🚀 Executando o Projeto

### Opção 1: Script Automatizado (Recomendado)
1. Abra o **Command Prompt** ou **PowerShell**
2. Navegue até a pasta do projeto
3. Execute: `start-project.bat`
4. Siga as instruções do menu interativo

### Opção 2: Execução Manual

#### Backend (Spring Boot):
```cmd
# Compile o projeto
mvn clean compile

# Execute o backend
mvn spring-boot:run
```

#### Frontend (React):
```cmd
# Navegue para a pasta frontend
cd frontend

# Instale as dependências (primeira vez)
npm install

# Execute o frontend
npm run dev
```

## 📍 URLs de Acesso

Após iniciar ambos os serviços:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **H2 Console:** http://localhost:8080/h2-console

### Configuração do H2 Console:
- **JDBC URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** (deixe em branco)

## 🛠️ Solução de Problemas

### Erro: 'mvn' não é reconhecido
- Verifique se o Maven está instalado e no PATH
- Reinicie o Command Prompt após adicionar ao PATH

### Erro: 'java' não é reconhecido
- Verifique se o Java JDK está instalado e no PATH
- Use `java -version` para testar

### Erro: 'npm' não é reconhecido
- Verifique se o Node.js está instalado corretamente
- Reinicie o Command Prompt

### Porta em uso
- **Backend (8080):** Pare outros serviços usando a porta 8080
- **Frontend (3000):** Pare outros serviços usando a porta 3000

### Dependências do NPM
Se houver problemas com as dependências do frontend:
```cmd
cd frontend
rmdir /s node_modules
del package-lock.json
npm install
```

## 📦 Estrutura do Projeto

```
SoccerShirt/
├── src/                    # Código fonte Java (Spring Boot)
├── frontend/               # Código fonte React (TypeScript)
├── scripts/               # Scripts de inicialização
├── start-project.bat      # Script principal do Windows
└── README.md             # Documentação principal
```

## 🔄 Comandos Úteis

### Backend:
```cmd
# Compilar
mvn clean compile

# Executar testes
mvn test

# Criar build para produção
mvn clean package

# Executar com profile específico
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend:
```cmd
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Criar build para produção
npm run build

# Executar lint
npm run lint
```

## 🎯 Primeiros Passos

1. **Instale todos os pré-requisitos** listados acima
2. **Execute o script** `start-project.bat` e escolha a opção 4 para verificar se tudo está instalado
3. **Inicie o backend** (opção 1 do menu)
4. **Em outro terminal, inicie o frontend** (opção 2 do menu)
5. **Acesse** http://localhost:3000 para ver a aplicação

## 💡 Dicas

- **Use dois terminais:** Um para o backend e outro para o frontend
- **Verifique os logs:** Se algo não funcionar, verifique as mensagens de erro nos terminais
- **Ordem de inicialização:** Inicie sempre o backend antes do frontend
- **Navegador:** Use Chrome, Firefox ou Edge para melhor compatibilidade

## 🆘 Precisa de Ajuda?

- Verifique o arquivo `README.md` para mais informações
- Consulte a documentação da API em http://localhost:8080/swagger-ui.html
- Teste os endpoints da API usando o Swagger UI

---

⚽ **Boa sorte com o Soccer Shirt E-commerce!** ⚽
