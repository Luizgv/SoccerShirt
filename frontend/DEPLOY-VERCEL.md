# Deploy na Vercel - Soccer Shirt

## Configuração do Deploy

### 1. Configurações no Dashboard da Vercel

Ao fazer o deploy do frontend na Vercel, use as seguintes configurações:

- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2. Variáveis de Ambiente

Configure a seguinte variável de ambiente na Vercel:

```
VITE_API_URL=https://sua-api-backend.com
```

**Importante**: O backend precisa estar rodando em algum lugar (Heroku, Railway, Render, etc.) e a URL deve ser configurada aqui.

### 3. Arquivo vercel.json

O arquivo `vercel.json` já está configurado para redirecionar todas as rotas para o `index.html`, resolvendo o problema de 404 ao acessar rotas diretamente.

### 4. Passos para Deploy

1. Conecte seu repositório GitHub à Vercel
2. Selecione o projeto
3. Configure o **Root Directory** como `frontend`
4. Adicione as variáveis de ambiente
5. Clique em Deploy

### 5. Solução de Problemas

**Erro 404 ao acessar rotas**: 
- Verifique se o arquivo `vercel.json` está presente em `frontend/`
- Certifique-se de que o Root Directory está configurado como `frontend`

**API não conecta**:
- Verifique se a variável `VITE_API_URL` está configurada corretamente
- Lembre-se que o backend precisa estar rodando em um servidor separado
- Configure o CORS no backend para aceitar requisições do domínio da Vercel

**Build falha**:
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` e `npm run build` localmente para testar

## Configuração do Backend

O backend Java/Spring Boot precisa ser hospedado separadamente. Opções:

1. **Railway**: Fácil deploy de aplicações Java
2. **Render**: Suporte para Java/Spring Boot
3. **Heroku**: Tradicional, mas pago
4. **AWS/Azure**: Para produção enterprise

### CORS no Backend

Certifique-se de configurar o CORS no Spring Boot para aceitar requisições do frontend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("https://seu-dominio-vercel.vercel.app")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

