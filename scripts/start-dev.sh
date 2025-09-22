#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento completo..."
echo "📦 Backend: Spring Boot + Frontend: React"
echo ""

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando serviços..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Serviços parados."
    exit
}

# Capturar Ctrl+C
trap cleanup SIGINT SIGTERM

# Diretório do script
SCRIPT_DIR="$(dirname "$0")"

# Verificar se os scripts existem
if [ ! -f "$SCRIPT_DIR/start-backend.sh" ]; then
    echo "❌ Script do backend não encontrado: $SCRIPT_DIR/start-backend.sh"
    exit 1
fi

if [ ! -f "$SCRIPT_DIR/start-frontend.sh" ]; then
    echo "❌ Script do frontend não encontrado: $SCRIPT_DIR/start-frontend.sh"
    exit 1
fi

# Tornar scripts executáveis
chmod +x "$SCRIPT_DIR/start-backend.sh"
chmod +x "$SCRIPT_DIR/start-frontend.sh"

echo "🔧 Iniciando backend..."
"$SCRIPT_DIR/start-backend.sh" &
BACKEND_PID=$!

# Aguardar o backend iniciar
echo "⏳ Aguardando backend inicializar..."
sleep 10

# Verificar se o backend ainda está rodando
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "❌ Falha ao iniciar o backend. Verifique os logs."
    exit 1
fi

echo "✅ Backend iniciado com sucesso!"
echo ""
echo "🔧 Iniciando frontend..."
"$SCRIPT_DIR/start-frontend.sh" &
FRONTEND_PID=$!

echo ""
echo "🎉 Ambiente de desenvolvimento iniciado!"
echo "================================================"
echo "🔗 URLs importantes:"
echo "   Frontend:     http://localhost:3000"
echo "   Backend API:  http://localhost:8080"
echo "   Swagger UI:   http://localhost:8080/swagger-ui.html"
echo "   H2 Console:   http://localhost:8080/h2-console"
echo ""
echo "💡 Dica: Abra http://localhost:3000 para acessar a aplicação"
echo ""
echo "Para parar todos os serviços, pressione Ctrl+C"
echo "================================================"

# Aguardar indefinidamente
wait
