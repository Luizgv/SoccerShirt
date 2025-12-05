# Variáveis de Ambiente - Soccer Shirt Frontend

## Desenvolvimento Local

Crie um arquivo `.env` na pasta `frontend/` com:

```env
VITE_API_URL=http://localhost:8080
```

## Produção (Vercel)

Configure as seguintes variáveis de ambiente no dashboard da Vercel:

- `VITE_API_URL`: URL do backend em produção (ex: https://seu-backend.railway.app)

## Notas Importantes

- Variáveis de ambiente no Vite devem começar com `VITE_`
- Após alterar variáveis de ambiente, reinicie o servidor de desenvolvimento
- Em produção, não se esqueça de configurar o CORS no backend para aceitar requisições do domínio da Vercel

