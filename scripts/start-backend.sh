#!/bin/bash

echo "🚀 Iniciando o backend Spring Boot..."
echo "📦 Compilando e executando..."

# Verificar se Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não encontrado. Por favor, instale o Maven primeiro."
    exit 1
fi

# Verificar se Java 17+ está instalado
if ! command -v java &> /dev/null; then
    echo "❌ Java não encontrado. Por favor, instale o Java 17+ primeiro."
    exit 1
fi

# Verificar versão do Java
JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Versão do Java incompatível. Necessário Java 17+. Versão atual: $JAVA_VERSION"
    exit 1
fi

echo "✅ Java version: $(java -version 2>&1 | head -1)"
echo "✅ Maven version: $(mvn -version | head -1)"

# Navegar para o diretório raiz (caso o script seja executado de outro local)
cd "$(dirname "$0")/.."

# Compilar e executar o projeto
echo "🔨 Compilando o projeto..."
mvn clean compile

if [ $? -eq 0 ]; then
    echo "✅ Compilação concluída com sucesso!"
    echo "🚀 Iniciando a aplicação..."
    echo "📍 A aplicação estará disponível em: http://localhost:8080"
    echo "📚 Documentação da API (Swagger): http://localhost:8080/swagger-ui.html"
    echo "🛠️  H2 Console: http://localhost:8080/h2-console"
    echo ""
    echo "Para parar a aplicação, pressione Ctrl+C"
    echo "================================================"
    
    mvn spring-boot:run
else
    echo "❌ Erro na compilação. Verifique os logs acima."
    exit 1
fi
