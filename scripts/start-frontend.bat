@echo off
echo 🚀 Iniciando o frontend React...

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale o Node.js 18+ primeiro.
    pause
    exit /b 1
)

REM Verificar se npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ NPM não encontrado. Por favor, instale o NPM primeiro.
    pause
    exit /b 1
)

echo ✅ Verificando versões...
node --version
npm --version

REM Navegar para o diretório frontend
cd /d "%~dp0\..\frontend"

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    npm install
    
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar dependências. Verifique os logs acima.
        pause
        exit /b 1
    )
    echo ✅ Dependências instaladas com sucesso!
) else (
    echo ✅ Dependências já instaladas.
)

echo 🚀 Iniciando servidor de desenvolvimento...
echo 📍 A aplicação estará disponível em: http://localhost:3000
echo 🔄 Hot reload habilitado - mudanças serão refletidas automaticamente
echo.
echo Para parar o servidor, pressione Ctrl+C
echo ================================================

npm run dev
