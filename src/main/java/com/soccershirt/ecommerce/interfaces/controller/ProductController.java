package com.soccershirt.ecommerce.interfaces.controller;

import com.soccershirt.ecommerce.application.service.ProductService;
import com.soccershirt.ecommerce.domain.ProductCategory;
import com.soccershirt.ecommerce.interfaces.dto.ProductDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST para gerenciar produtos
 */
@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "API para gerenciar produtos de camisas de futebol")
@CrossOrigin(origins = "*") // Permitir CORS para desenvolvimento
public class ProductController {
    
    private static final Logger log = LoggerFactory.getLogger(ProductController.class);
    
    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    @Operation(summary = "Lista todos os produtos", description = "Retorna uma lista paginada de produtos disponíveis")
    public ResponseEntity<Page<ProductDto>> getAllProducts(
            @Parameter(description = "Número da página (0-indexed)")
            @RequestParam(defaultValue = "0") @Min(0) int page,
            
            @Parameter(description = "Tamanho da página")
            @RequestParam(defaultValue = "12") @Min(1) int size,
            
            @Parameter(description = "Campo para ordenação")
            @RequestParam(defaultValue = "id") String sortBy,
            
            @Parameter(description = "Direção da ordenação")
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("Requisição para listar produtos - página: {}, tamanho: {}, ordenação: {} {}", 
                 page, size, sortBy, sortDir);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ProductDto> products = productService.findAllProducts(pageable);
        
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Busca produto por ID", description = "Retorna um produto específico pelo seu ID")
    public ResponseEntity<ProductDto> getProductById(
            @Parameter(description = "ID do produto")
            @PathVariable Long id) {
        
        log.info("Requisição para buscar produto por ID: {}", id);
        
        return productService.findProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{category}")
    @Operation(summary = "Busca produtos por categoria", description = "Retorna produtos filtrados por categoria")
    public ResponseEntity<Page<ProductDto>> getProductsByCategory(
            @Parameter(description = "Categoria do produto")
            @PathVariable ProductCategory category,
            
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "12") @Min(1) int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("Requisição para buscar produtos por categoria: {}", category);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ProductDto> products = productService.findProductsByCategory(category, pageable);
        
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/team/{team}")
    @Operation(summary = "Busca produtos por time", description = "Retorna produtos filtrados por time")
    public ResponseEntity<Page<ProductDto>> getProductsByTeam(
            @Parameter(description = "Nome do time")
            @PathVariable String team,
            
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "12") @Min(1) int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("Requisição para buscar produtos por time: {}", team);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ProductDto> products = productService.findProductsByTeam(team, pageable);
        
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Busca produtos com filtros", description = "Busca produtos usando múltiplos filtros")
    public ResponseEntity<Page<ProductDto>> searchProducts(
            @Parameter(description = "Nome do time (opcional)")
            @RequestParam(required = false) String team,
            
            @Parameter(description = "Nome da liga (opcional)")
            @RequestParam(required = false) String league,
            
            @Parameter(description = "Categoria do produto (opcional)")
            @RequestParam(required = false) ProductCategory category,
            
            @Parameter(description = "Nome do produto (opcional)")
            @RequestParam(required = false) String name,
            
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "12") @Min(1) int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("Requisição de busca com filtros - time: {}, liga: {}, categoria: {}, nome: {}", 
                 team, league, category, name);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ProductDto> products;
        if (name != null && !name.trim().isEmpty()) {
            products = productService.findProductsByName(name, pageable);
        } else {
            products = productService.findProductsByFilters(team, league, category, pageable);
        }
        
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/catalog")
    @Operation(summary = "Catálogo completo", description = "Retorna todos os produtos com tamanhos para exibição em catálogo")
    public ResponseEntity<List<ProductDto>> getCatalog() {
        log.info("Requisição para catálogo completo de produtos");
        
        List<ProductDto> products = productService.findAllProductsWithSizes();
        return ResponseEntity.ok(products);
    }
}
