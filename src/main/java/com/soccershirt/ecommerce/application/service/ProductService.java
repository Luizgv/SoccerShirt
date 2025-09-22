package com.soccershirt.ecommerce.application.service;

import com.soccershirt.ecommerce.domain.Product;
import com.soccershirt.ecommerce.domain.ProductCategory;
import com.soccershirt.ecommerce.domain.ProductSize;
import com.soccershirt.ecommerce.domain.Size;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    private final List<Product> products;
    
    public ProductService() {
        this.products = createSampleProducts();
    }
    
    public List<Product> findAll() {
        return new ArrayList<>(products);
    }
    
    public Optional<Product> findById(Long id) {
        return products.stream()
                .filter(product -> product.id().equals(id))
                .findFirst();
    }
    
    public List<Product> findByCategory(ProductCategory category) {
        return products.stream()
                .filter(product -> product.category().equals(category))
                .toList();
    }
    
    public List<Product> findByTeam(String team) {
        return products.stream()
                .filter(product -> product.team().toLowerCase().contains(team.toLowerCase()))
                .toList();
    }
    
    private List<Product> createSampleProducts() {
        List<Product> sampleProducts = new ArrayList<>();
        
        // Camisas do Brasil
        sampleProducts.add(new Product(
                1L,
                "Camisa Brasil Home 2024",
                "Camisa oficial da Seleção Brasileira para jogos em casa",
                new BigDecimal("299.99"),
                "Brasil",
                ProductCategory.SELECAO,
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
                List.of(
                        new ProductSize(Size.P, 10),
                        new ProductSize(Size.M, 15),
                        new ProductSize(Size.G, 12),
                        new ProductSize(Size.GG, 8)
                )
        ));
        
        sampleProducts.add(new Product(
                2L,
                "Camisa Brasil Away 2024",
                "Camisa oficial da Seleção Brasileira para jogos fora de casa",
                new BigDecimal("299.99"),
                "Brasil",
                ProductCategory.SELECAO,
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
                List.of(
                        new ProductSize(Size.P, 8),
                        new ProductSize(Size.M, 12),
                        new ProductSize(Size.G, 10),
                        new ProductSize(Size.GG, 5)
                )
        ));
        
        // Camisas de clubes brasileiros
        sampleProducts.add(new Product(
                3L,
                "Camisa Flamengo Home 2024",
                "Camisa oficial do Clube de Regatas do Flamengo",
                new BigDecimal("249.99"),
                "Flamengo",
                ProductCategory.CLUBE_BRASILEIRO,
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
                List.of(
                        new ProductSize(Size.P, 20),
                        new ProductSize(Size.M, 25),
                        new ProductSize(Size.G, 18),
                        new ProductSize(Size.GG, 12)
                )
        ));
        
        sampleProducts.add(new Product(
                4L,
                "Camisa Corinthians Home 2024",
                "Camisa oficial do Sport Club Corinthians Paulista",
                new BigDecimal("249.99"),
                "Corinthians",
                ProductCategory.CLUBE_BRASILEIRO,
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
                List.of(
                        new ProductSize(Size.P, 15),
                        new ProductSize(Size.M, 20),
                        new ProductSize(Size.G, 16),
                        new ProductSize(Size.GG, 10)
                )
        ));
        
        sampleProducts.add(new Product(
                5L,
                "Camisa Palmeiras Home 2024",
                "Camisa oficial da Sociedade Esportiva Palmeiras",
                new BigDecimal("249.99"),
                "Palmeiras",
                ProductCategory.CLUBE_BRASILEIRO,
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
                List.of(
                        new ProductSize(Size.P, 12),
                        new ProductSize(Size.M, 18),
                        new ProductSize(Size.G, 14),
                        new ProductSize(Size.GG, 8)
                )
        ));
        
        // Camisas de clubes europeus
        sampleProducts.add(new Product(
                6L,
                "Camisa Real Madrid Home 2024",
                "Camisa oficial do Real Madrid Club de Fútbol",
                new BigDecimal("349.99"),
                "Real Madrid",
                ProductCategory.CLUBE_EUROPEU,
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
                List.of(
                        new ProductSize(Size.P, 8),
                        new ProductSize(Size.M, 12),
                        new ProductSize(Size.G, 10),
                        new ProductSize(Size.GG, 6)
                )
        ));
        
        sampleProducts.add(new Product(
                7L,
                "Camisa Barcelona Home 2024",
                "Camisa oficial do Futbol Club Barcelona",
                new BigDecimal("349.99"),
                "Barcelona",
                ProductCategory.CLUBE_EUROPEU,
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
                List.of(
                        new ProductSize(Size.P, 10),
                        new ProductSize(Size.M, 15),
                        new ProductSize(Size.G, 12),
                        new ProductSize(Size.GG, 7)
                )
        ));
        
        sampleProducts.add(new Product(
                8L,
                "Camisa Manchester United Home 2024",
                "Camisa oficial do Manchester United Football Club",
                new BigDecimal("349.99"),
                "Manchester United",
                ProductCategory.CLUBE_EUROPEU,
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
                List.of(
                        new ProductSize(Size.P, 6),
                        new ProductSize(Size.M, 10),
                        new ProductSize(Size.G, 8),
                        new ProductSize(Size.GG, 4)
                )
        ));
        
        return sampleProducts;
    }
}