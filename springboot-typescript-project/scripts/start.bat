@echo off
echo 🚀 Iniciando Backoffice - E-commerce Eletrônicos
echo ==============================================

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado

REM Instalar dependências se não existir node_modules
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    npm install
    if errorlevel 1 (
        echo ❌ Erro ao instalar dependências
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependências já instaladas
)

REM Compilar TypeScript
echo 🔨 Compilando TypeScript...
npm run build
if errorlevel 1 (
    echo ❌ Erro na compilação
    pause
    exit /b 1
)

echo ✅ Compilação concluída

REM Iniciar aplicação
echo 🌟 Iniciando aplicação...
echo.
echo 📋 Informações importantes:
echo    🌐 URL: http://localhost:3000
echo    📚 API: http://localhost:3000/api
echo    👤 Admin: gustavo.nscto@gmail.com
echo    🔑 Senha: 1234
echo.
echo 🎯 Pressione Ctrl+C para parar a aplicação
echo.

npm run start
