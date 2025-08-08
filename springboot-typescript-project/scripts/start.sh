#!/bin/bash

echo "🚀 Iniciando Backoffice - E-commerce Eletrônicos"
echo "=============================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) encontrado"

# Instalar dependências se não existir node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar dependências"
        exit 1
    fi
else
    echo "✅ Dependências já instaladas"
fi

# Compilar TypeScript
echo "🔨 Compilando TypeScript..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro na compilação"
    exit 1
fi

echo "✅ Compilação concluída"

# Iniciar aplicação
echo "🌟 Iniciando aplicação..."
echo ""
echo "📋 Informações importantes:"
echo "   🌐 URL: http://localhost:3000"
echo "   📚 API: http://localhost:3000/api"
echo "   👤 Admin: gustavo.nscto@gmail.com"
echo "   🔑 Senha: 1234"
echo ""
echo "🎯 Pressione Ctrl+C para parar a aplicação"
echo ""

npm run start
