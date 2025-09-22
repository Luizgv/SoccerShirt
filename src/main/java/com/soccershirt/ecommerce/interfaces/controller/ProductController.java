package com.soccershirt.ecommerce.interfaces.controller;

import com.soccershirt.ecommerce.application.service.ProductService;
import com.soccershirt.ecommerce.domain.Product;
import com.soccershirt.ecommerce.domain.ProductCategory;
import com.soccershirt.ecommerce.interfaces.dto.ProductDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST para gerenciar produtos
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Permitir CORS para desenvolvimento
public class ProductController {
    
    private static final Logger log = LoggerFactory.getLogger(ProductController.class);
    
    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        log.info("Requisição para listar todos os produtos");
        
        List<Product> products = productService.findAll();
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .toList();
        
        return ResponseEntity.ok(productDtos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        log.info("Requisição para buscar produto por ID: {}", id);
        
        return productService.findById(id)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable ProductCategory category) {
        log.info("Requisição para buscar produtos por categoria: {}", category);
        
        List<Product> products = productService.findByCategory(category);
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .toList();
        
        return ResponseEntity.ok(productDtos);
    }
    
    @GetMapping("/team/{team}")
    public ResponseEntity<List<ProductDto>> getProductsByTeam(@PathVariable String team) {
        log.info("Requisição para buscar produtos por time: {}", team);
        
        List<Product> products = productService.findByTeam(team);
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .toList();
        
        return ResponseEntity.ok(productDtos);
    }
    
    private ProductDto convertToDto(Product product) {
        return new ProductDto(
                product.id(),
                product.name(),
                product.description(),
                product.price(),
                product.team(),
                product.category(),
                product.imageUrl(),
                product.sizes().stream()
                        .map(size -> new com.soccershirt.ecommerce.interfaces.dto.ProductSizeDto(
                                size.size(),
                                size.stock()
                        ))
                        .toList()
        );
    }
}