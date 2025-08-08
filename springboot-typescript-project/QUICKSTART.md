# 🚀 Quick Start - Backoffice

## ⚡ Instalação Rápida

### Windows
```bash
# 1. Execute o script de inicialização
scripts\start.bat
```

### Linux/Mac
```bash
# 1. Execute o script de inicialização
./scripts/start.sh
```

### Manual
```bash
# 1. Instalar dependências
npm install

# 2. Compilar TypeScript
npm run build

# 3. Iniciar aplicação
npm start
```

## 🎯 Acesso Rápido

**URL da Aplicação:** http://localhost:3000

**Credenciais do Administrador:**
- **Email:** gustavo.nscto@gmail.com
- **Senha:** 1234

## 📱 Funcionalidades Principais

### 🔐 Login
1. Acesse http://localhost:3000
2. Use as credenciais acima
3. Clique em "Entrar"

### 👥 Gestão de Usuários (Admin)
1. Após login, clique em "👥 Usuários"
2. **Criar usuário:** Botão "➕ Novo Usuário"
3. **Editar:** Botão "✏️ Editar" na tabela
4. **Alterar senha:** Botão "🔑 Senha"
5. **Ativar/Desativar:** Botão "❌ Desativar" / "✅ Ativar"

### 📦 Produtos
1. Após login, clique em "📦 Produtos"
2. Visualize o catálogo atual (dados de exemplo)

## 🛠️ Desenvolvimento

### Modo de Desenvolvimento
```bash
npm run start:dev
```

### Executar Testes
```bash
npm test
```

### Linting e Formatação
```bash
npm run lint
npm run format
```

## 📋 Checklist de Validação

### ✅ Funcionalidades Básicas
- [ ] Login com credenciais corretas
- [ ] Dashboard carrega após login
- [ ] Navegação entre seções funciona
- [ ] Logout funciona corretamente

### ✅ Gestão de Usuários (Admin)
- [ ] Listar usuários mostra dados
- [ ] Criar usuário funciona
- [ ] Editar usuário funciona
- [ ] Alterar senha funciona
- [ ] Ativar/Desativar funciona
- [ ] Validações de CPF/email funcionam

### ✅ Segurança
- [ ] Usuário não logado é redirecionado
- [ ] Token JWT é válido
- [ ] Rate limiting funciona (5 tentativas)
- [ ] Usuários desativados não conseguem logar

### ✅ Interface
- [ ] Design responsivo em mobile
- [ ] Mensagens de feedback aparecem
- [ ] Modais abrem/fecham corretamente
- [ ] Formulários validam dados

## 🐛 Problemas Comuns

### Aplicação não inicia
```bash
# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
npm run build
npm start
```

### Erro de permissão (Linux/Mac)
```bash
chmod +x scripts/start.sh
./scripts/start.sh
```

### Porta 3000 em uso
```bash
# Usar porta diferente
PORT=3001 npm start
```

### Login não funciona
- Verificar se as credenciais estão corretas
- Email: gustavo.nscto@gmail.com
- Senha: 1234
- Verificar se a aplicação inicializou corretamente

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs** no console da aplicação
2. **Consulte o arquivo** `DEVELOPMENT.md` para detalhes técnicos
3. **Execute os testes** com `npm test` para verificar integridade
4. **Verifique as dependências** com `npm ls`

## 🎯 Próximos Passos

Após validar o funcionamento básico:

1. **Explorar código:** Consulte `DEVELOPMENT.md`
2. **Executar testes:** `npm run test:cov`
3. **Personalizar:** Altere cores, textos e funcionalidades
4. **Integrar banco:** Siga instruções para PostgreSQL
5. **Deploy:** Configure para produção

---

**🎉 Parabéns! Seu backoffice está funcionando!**
