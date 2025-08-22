@echo off
title Soccer Shirt E-commerce - Inicializador
color 0A

echo.
echo ===============================================
echo    ⚽ SOCCER SHIRT E-COMMERCE ⚽
echo ===============================================
echo.
echo Este é um e-commerce de camisas de futebol
echo desenvolvido com Spring Boot e React.
echo.
echo REQUISITOS NECESSÁRIOS:
echo • Java 17 ou superior
echo • Maven 3.6 ou superior  
echo • Node.js 18 ou superior
echo • NPM
echo.
echo ===============================================
echo.
echo Escolha uma opção:
echo.
echo [1] Iniciar Backend (Spring Boot)
echo [2] Iniciar Frontend (React)
echo [3] Abrir documentação da API (Swagger)
echo [4] Verificar requisitos do sistema
echo [5] Instalar dependências do frontend
echo [6] Sair
echo.
echo ===============================================

set /p choice="Digite sua escolha (1-6): "

if "%choice%"=="1" goto backend
if "%choice%"=="2" goto frontend
if "%choice%"=="3" goto swagger
if "%choice%"=="4" goto check
if "%choice%"=="5" goto install
if "%choice%"=="6" goto exit
goto invalid

:backend
echo.
echo 🚀 Iniciando Backend...
echo ===============================================
cd /d "%~dp0"
call scripts\start-backend.bat
goto end

:frontend
echo.
echo 🚀 Iniciando Frontend...
echo ===============================================
cd /d "%~dp0"
call scripts\start-frontend.bat
goto end

:swagger
echo.
echo 📚 Abrindo documentação da API...
echo ===============================================
echo Certifique-se de que o backend está rodando primeiro!
echo.
start http://localhost:8080/swagger-ui.html
echo Swagger UI aberto no navegador padrão.
pause
goto start

:check
echo.
echo 🔍 Verificando requisitos do sistema...
echo ===============================================
echo.

echo Verificando Java...
java -version >nul 2>&1
if %errorlevel% equ 0 (
    java -version
    echo ✅ Java encontrado!
) else (
    echo ❌ Java NÃO encontrado!
    echo Download: https://www.oracle.com/java/technologies/downloads/
)
echo.

echo Verificando Maven...
mvn -version >nul 2>&1
if %errorlevel% equ 0 (
    mvn -version
    echo ✅ Maven encontrado!
) else (
    echo ❌ Maven NÃO encontrado!
    echo Download: https://maven.apache.org/download.cgi
)
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    node --version
    echo ✅ Node.js encontrado!
) else (
    echo ❌ Node.js NÃO encontrado!
    echo Download: https://nodejs.org/
)
echo.

echo Verificando NPM...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    npm --version
    echo ✅ NPM encontrado!
) else (
    echo ❌ NPM NÃO encontrado!
)
echo.
echo ===============================================
pause
goto start

:install
echo.
echo 📦 Instalando dependências do frontend...
echo ===============================================
cd /d "%~dp0\frontend"
if exist "package.json" (
    npm install
    if %errorlevel% equ 0 (
        echo ✅ Dependências instaladas com sucesso!
    ) else (
        echo ❌ Erro ao instalar dependências!
    )
) else (
    echo ❌ Arquivo package.json não encontrado!
)
echo.
pause
goto start

:invalid
echo.
echo ❌ Opção inválida! Tente novamente.
echo.
pause
goto start

:start
cls
goto :start-project

:exit
echo.
echo 👋 Obrigado por usar o Soccer Shirt E-commerce!
echo.
pause
exit

:end
echo.
echo Pressione qualquer tecla para voltar ao menu...
pause
goto start
