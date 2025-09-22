-- ===============================================
-- SCRIPTS ÚTEIS PARA H2 CONSOLE
-- ===============================================
-- Acesse http://localhost:8080/h2-console
-- JDBC URL: jdbc:h2:mem:soccershirt_db
-- User: sa
-- Password: (deixe vazio)

-- ===============================================
-- CONSULTAS BÁSICAS
-- ===============================================

-- Ver todas as tabelas criadas
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC';

-- ===============================================
-- CONSULTAS DE DADOS
-- ===============================================

-- Listar todos os produtos
SELECT * FROM PRODUCT ORDER BY NAME;

-- Listar produtos por categoria
SELECT * FROM PRODUCT WHERE CATEGORY = 'Nacional';
SELECT * FROM PRODUCT WHERE CATEGORY = 'Internacional';

-- Listar produtos com desconto
SELECT NAME, TEAM, PRICE, OLD_PRICE, 
       (OLD_PRICE - PRICE) as DESCONTO,
       ROUND(((OLD_PRICE - PRICE) / OLD_PRICE) * 100, 2) as DESCONTO_PERCENTUAL
FROM PRODUCT 
WHERE OLD_PRICE > PRICE
ORDER BY DESCONTO_PERCENTUAL DESC;

-- Listar todos os cupons ativos
SELECT * FROM COUPON WHERE ACTIVE = TRUE ORDER BY PERCENT DESC;

-- Listar todos os usuários
SELECT ID, FULL_NAME, EMAIL, ROLES FROM USERS;

-- Verificar itens no carrinho (se houver)
SELECT ci.ID, u.FULL_NAME, p.NAME, p.TEAM, ci.QUANTITY, p.PRICE,
       (ci.QUANTITY * p.PRICE) as TOTAL_ITEM
FROM CART_ITEM ci
JOIN USERS u ON ci.USER_ID = u.ID
JOIN PRODUCT p ON ci.PRODUCT_ID = p.ID;

-- Verificar favoritos (se houver)
SELECT f.ID, u.FULL_NAME, p.NAME, p.TEAM
FROM FAVORITE f
JOIN USERS u ON f.USER_ID = u.ID
JOIN PRODUCT p ON f.PRODUCT_ID = p.ID;

-- Verificar pedidos (se houver)
SELECT o.ID, u.FULL_NAME, o.TOTAL, o.DISCOUNT, o.CREATED_AT
FROM ORDERS o
JOIN USERS u ON o.USER_ID = u.ID
ORDER BY o.CREATED_AT DESC;

-- ===============================================
-- CONSULTAS ESTATÍSTICAS
-- ===============================================

-- Produto mais caro e mais barato
SELECT 'MAIS_CARO' as TIPO, NAME, TEAM, PRICE FROM PRODUCT WHERE PRICE = (SELECT MAX(PRICE) FROM PRODUCT)
UNION ALL
SELECT 'MAIS_BARATO' as TIPO, NAME, TEAM, PRICE FROM PRODUCT WHERE PRICE = (SELECT MIN(PRICE) FROM PRODUCT);

-- Média de preços por categoria
SELECT CATEGORY, 
       COUNT(*) as QUANTIDADE,
       ROUND(AVG(PRICE), 2) as PRECO_MEDIO,
       ROUND(MIN(PRICE), 2) as PRECO_MIN,
       ROUND(MAX(PRICE), 2) as PRECO_MAX
FROM PRODUCT 
GROUP BY CATEGORY;

-- Produtos com melhor avaliação
SELECT NAME, TEAM, RATING, PRICE 
FROM PRODUCT 
ORDER BY RATING DESC, PRICE ASC
LIMIT 5;

-- ===============================================
-- COMANDOS DE ADMINISTRAÇÃO
-- ===============================================

-- Limpar carrinho de um usuário específico
-- DELETE FROM CART_ITEM WHERE USER_ID = 1;

-- Desativar um cupom
-- UPDATE COUPON SET ACTIVE = FALSE WHERE CODE = 'BEMVINDO10';

-- Ativar um cupom
-- UPDATE COUPON SET ACTIVE = TRUE WHERE CODE = 'BEMVINDO10';

-- Adicionar um produto manualmente (exemplo)
-- INSERT INTO PRODUCT (NAME, TEAM, CATEGORY, IMAGE_URL, PRICE, OLD_PRICE, RATING) 
-- VALUES ('Camisa Liverpool I', 'Liverpool', 'Internacional', '/images/liverpool.jpg', 429.00, 529.00, 4.7);
