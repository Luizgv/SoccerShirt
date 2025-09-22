@echo off
title Soccer Shirt - Desenvolvimento
color 0A

echo.
echo ⚽ INICIANDO SOCCER SHIRT E-COMMERCE ⚽
echo.

echo 🚀 Iniciando Backend (Spring Boot)...
start "Backend" cmd /k "mvn spring-boot:run"

echo.
echo ⏳ Aguardando 10 segundos para o backend inicializar...
timeout /t 10 /nobreak >nul

echo.
echo 🎨 Iniciando Frontend (React)...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Aplicação iniciada!
echo.
echo 📍 URLs importantes:
echo   • Frontend: http://localhost:5173
echo   • Backend API: http://localhost:8080/api/products
echo.
echo Pressione qualquer tecla para sair...
pause >nul
