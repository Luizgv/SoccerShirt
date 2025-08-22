package com.soccershirt.ecommerce.application.service;

import com.soccershirt.ecommerce.domain.Product;
import com.soccershirt.ecommerce.domain.ProductCategory;
import com.soccershirt.ecommerce.infrastructure.mapper.ProductMapper;
import com.soccershirt.ecommerce.infrastructure.persistence.entity.ProductEntity;
import com.soccershirt.ecommerce.infrastructure.persistence.repository.ProductRepository;
import com.soccershirt.ecommerce.interfaces.dto.ProductDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Serviço de aplicação para gerenciar produtos
 */
@Service
@Transactional(readOnly = true)
public class ProductService {
    
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
    
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    
    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }
    
    /**
     * Busca todos os produtos disponíveis com paginação
     */
    public Page<ProductDto> findAllProducts(Pageable pageable) {
        log.info("Buscando produtos com paginação: {}", pageable);
        
        Page<ProductEntity> products = productRepository.findByIsAvailableTrue(pageable);
        return products.map(productMapper::entityToDto);
    }
    
    /**
     * Busca produto por ID
     */
    public Optional<ProductDto> findProductById(Long id) {
        log.info("Buscando produto por ID: {}", id);
        
        return productRepository.findById(id)
                .filter(ProductEntity::isAvailable)
                .map(productMapper::entityToDto);
    }
    
    /**
     * Busca produtos por categoria
     */
    public Page<ProductDto> findProductsByCategory(ProductCategory category, Pageable pageable) {
        log.info("Buscando produtos por categoria: {} com paginação: {}", category, pageable);
        
        Page<ProductEntity> products = productRepository.findByCategoryAndIsAvailableTrue(category, pageable);
        return products.map(productMapper::entityToDto);
    }
    
    /**
     * Busca produtos por time
     */
    public Page<ProductDto> findProductsByTeam(String team, Pageable pageable) {
        log.info("Buscando produtos por time: {} com paginação: {}", team, pageable);
        
        Page<ProductEntity> products = productRepository.findByTeamContainingIgnoreCaseAndIsAvailableTrue(team, pageable);
        return products.map(productMapper::entityToDto);
    }
    
    /**
     * Busca produtos por liga
     */
    public Page<ProductDto> findProductsByLeague(String league, Pageable pageable) {
        log.info("Buscando produtos por liga: {} com paginação: {}", league, pageable);
        
        Page<ProductEntity> products = productRepository.findByLeagueContainingIgnoreCaseAndIsAvailableTrue(league, pageable);
        return products.map(productMapper::entityToDto);
    }
    
    /**
     * Busca produtos por nome
     */
    public Page<ProductDto> findProductsByName(String name, Pageable pageable) {
        log.info("Buscando produtos por nome: {} com paginação: {}", name, pageable);
        
        Page<ProductEntity> products = productRepository.findByNameContainingIgnoreCaseAndIsAvailableTrue(name, pageable);
        return products.map(productMapper::entityToDto);
    }
    
    /**
     * Busca produtos com filtros múltiplos
     */
    public Page<ProductDto> findProductsByFilters(String team, String league, 
                                                 ProductCategory category, Pageable pageable) {
        log.info("Buscando produtos com filtros - time: {}, liga: {}, categoria: {}, paginação: {}", 
                 team, league, category, pageable);
        
        Page<ProductEntity> products = productRepository.findByFilters(team, league, category, pageable);
        return products.map(productMapper::entityToDto);
    }
    
    /**
     * Busca todos os produtos com seus tamanhos (para exibição em catálogo)
     */
    public List<ProductDto> findAllProductsWithSizes() {
        log.info("Buscando todos os produtos com tamanhos disponíveis");
        
        List<ProductEntity> products = productRepository.findAllAvailableWithSizes();
        return products.stream()
                .map(productMapper::entityToDto)
                .toList();
    }
}
