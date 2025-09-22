#!/bin/bash

echo "🚀 Iniciando o frontend React..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+ primeiro."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ NPM não encontrado. Por favor, instale o NPM primeiro."
    exit 1
fi

# Verificar versão do Node
NODE_VERSION=$(node -v | sed 's/v//' | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Versão do Node.js incompatível. Necessário Node.js 18+. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"

# Navegar para o diretório frontend
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR/../frontend"

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar dependências. Verifique os logs acima."
        exit 1
    fi
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "✅ Dependências já instaladas."
fi

echo "🚀 Iniciando servidor de desenvolvimento..."
echo "📍 A aplicação estará disponível em: http://localhost:3000"
echo "🔄 Hot reload habilitado - mudanças serão refletidas automaticamente"
echo ""
echo "Para parar o servidor, pressione Ctrl+C"
echo "================================================"

npm run dev
