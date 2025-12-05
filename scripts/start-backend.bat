@echo off
echo 🚀 Iniciando o backend Spring Boot...
echo 📦 Compilando e executando...

REM Verificar se Maven está instalado
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maven não encontrado. Por favor, instale o Maven primeiro.
    pause
    exit /b 1
)

REM Verificar se Java está instalado
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java não encontrado. Por favor, instale o Java 17+ primeiro.
    pause
    exit /b 1
)

echo ✅ Verificando versões...
java -version
mvn -version

REM Navegar para o diretório raiz do projeto
cd /d "%~dp0\.."

echo 🔨 Compilando o projeto...
mvn clean compile

if %errorlevel% equ 0 (
    echo ✅ Compilação concluída com sucesso!
    echo 🚀 Iniciando a aplicação...
    echo 📍 A aplicação estará disponível em: http://localhost:8080
    echo 📚 Documentação da API ^(Swagger^): http://localhost:8080/swagger-ui.html
    echo 🛠️  H2 Console: http://localhost:8080/h2-console
    echo.
    echo Para parar a aplicação, pressione Ctrl+C
    echo ================================================
    
    mvn spring-boot:run
) else (
    echo ❌ Erro na compilação. Verifique os logs acima.
    pause
    exit /b 1
)
