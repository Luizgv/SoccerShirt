package com.soccershirt.ecommerce.config;

import com.soccershirt.ecommerce.domain.ProductCategory;
import com.soccershirt.ecommerce.domain.Size;
import com.soccershirt.ecommerce.infrastructure.persistence.entity.ProductEntity;
import com.soccershirt.ecommerce.infrastructure.persistence.entity.ProductSizeEntity;
import com.soccershirt.ecommerce.infrastructure.persistence.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

/**
 * Inicializador de dados para popular o banco com produtos de exemplo
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    
    private final ProductRepository productRepository;
    
    public DataInitializer(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            log.info("Inicializando dados de exemplo...");
            createSampleProducts();
            log.info("Dados de exemplo criados com sucesso!");
        } else {
            log.info("Dados já existem no banco, pulando inicialização");
        }
    }
    
    private void createSampleProducts() {
        // Real Madrid
        ProductEntity realMadridHome = createProduct(
                "Camisa Real Madrid Home 24/25",
                "Real Madrid",
                "La Liga",
                "2024/25",
                "Camisa oficial do Real Madrid para a temporada 2024/25. Tradicional branca com detalhes em dourado.",
                new BigDecimal("299.90"),
                ProductCategory.HOME
        );
        
        ProductEntity realMadridAway = createProduct(
                "Camisa Real Madrid Away 24/25",
                "Real Madrid",
                "La Liga",
                "2024/25",
                "Segunda camisa do Real Madrid para a temporada 2024/25. Design moderno em preto com detalhes coloridos.",
                new BigDecimal("299.90"),
                ProductCategory.AWAY
        );
        
        // Barcelona
        ProductEntity barcelonaHome = createProduct(
                "Camisa Barcelona Home 24/25",
                "FC Barcelona",
                "La Liga",
                "2024/25",
                "Camisa oficial do Barcelona para a temporada 2024/25. Tradicional blaugrana com listras verticais.",
                new BigDecimal("289.90"),
                ProductCategory.HOME
        );
        
        ProductEntity barcelonaAway = createProduct(
                "Camisa Barcelona Away 24/25",
                "FC Barcelona",
                "La Liga",
                "2024/25",
                "Segunda camisa do Barcelona para a temporada 2024/25. Design especial em amarelo vibrante.",
                new BigDecimal("289.90"),
                ProductCategory.AWAY
        );
        
        // Manchester United
        ProductEntity manchesterHome = createProduct(
                "Camisa Manchester United Home 24/25",
                "Manchester United",
                "Premier League",
                "2024/25",
                "Camisa oficial do Manchester United para a temporada 2024/25. Vermelho tradicional com detalhes em preto.",
                new BigDecimal("319.90"),
                ProductCategory.HOME
        );
        
        // Arsenal
        ProductEntity arsenalHome = createProduct(
                "Camisa Arsenal Home 24/25",
                "Arsenal",
                "Premier League",
                "2024/25",
                "Camisa oficial do Arsenal para a temporada 2024/25. Vermelho cannonier com detalhes em branco.",
                new BigDecimal("309.90"),
                ProductCategory.HOME
        );
        
        // PSG
        ProductEntity psgHome = createProduct(
                "Camisa PSG Home 24/25",
                "Paris Saint-Germain",
                "Ligue 1",
                "2024/25",
                "Camisa oficial do PSG para a temporada 2024/25. Azul marinho com faixa vermelha central.",
                new BigDecimal("329.90"),
                ProductCategory.HOME
        );
        
        // Bayern Munich
        ProductEntity bayernHome = createProduct(
                "Camisa Bayern Munich Home 24/25",
                "Bayern Munich",
                "Bundesliga",
                "2024/25",
                "Camisa oficial do Bayern Munich para a temporada 2024/25. Vermelho tradicional com detalhes em branco.",
                new BigDecimal("315.90"),
                ProductCategory.HOME
        );
        
        // Flamengo
        ProductEntity flamengoHome = createProduct(
                "Camisa Flamengo Home 24/25",
                "Flamengo",
                "Brasileirão",
                "2024/25",
                "Camisa oficial do Flamengo para a temporada 2024/25. Tradicional rubro-negra com listras horizontais.",
                new BigDecimal("199.90"),
                ProductCategory.HOME
        );
        
        // Palmeiras
        ProductEntity palmeirasHome = createProduct(
                "Camisa Palmeiras Home 24/25",
                "Palmeiras",
                "Brasileirão",
                "2024/25",
                "Camisa oficial do Palmeiras para a temporada 2024/25. Verde alviverde tradicional.",
                new BigDecimal("189.90"),
                ProductCategory.HOME
        );
        
        // Salvar todos os produtos
        List<ProductEntity> products = Arrays.asList(
                realMadridHome, realMadridAway, barcelonaHome, barcelonaAway,
                manchesterHome, arsenalHome, psgHome, bayernHome,
                flamengoHome, palmeirasHome
        );
        
        productRepository.saveAll(products);
    }
    
    private ProductEntity createProduct(String name, String team, String league, String season,
                                       String description, BigDecimal basePrice, ProductCategory category) {
        ProductEntity product = new ProductEntity(name, team, league, season, description, basePrice, category);
        product = productRepository.save(product);
        
        // Criar tamanhos disponíveis para cada produto
        List<ProductSizeEntity> sizes = Arrays.asList(
                new ProductSizeEntity(product, Size.S, BigDecimal.ZERO, 10),
                new ProductSizeEntity(product, Size.M, BigDecimal.ZERO, 15),
                new ProductSizeEntity(product, Size.L, BigDecimal.ZERO, 12),
                new ProductSizeEntity(product, Size.XL, new BigDecimal("10.00"), 8),
                new ProductSizeEntity(product, Size.XXL, new BigDecimal("20.00"), 5)
        );
        
        product.setAvailableSizes(sizes);
        return productRepository.save(product);
    }
}
