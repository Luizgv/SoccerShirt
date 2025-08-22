package com.soccershirt.ecommerce.infrastructure.persistence.repository;

import com.soccershirt.ecommerce.domain.ProductCategory;
import com.soccershirt.ecommerce.infrastructure.persistence.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    
    /**
     * Busca produtos disponíveis com paginação
     */
    Page<ProductEntity> findByIsAvailableTrue(Pageable pageable);
    
    /**
     * Busca produtos por categoria
     */
    Page<ProductEntity> findByCategoryAndIsAvailableTrue(ProductCategory category, Pageable pageable);
    
    /**
     * Busca produtos por time
     */
    Page<ProductEntity> findByTeamContainingIgnoreCaseAndIsAvailableTrue(String team, Pageable pageable);
    
    /**
     * Busca produtos por liga
     */
    Page<ProductEntity> findByLeagueContainingIgnoreCaseAndIsAvailableTrue(String league, Pageable pageable);
    
    /**
     * Busca produtos por nome
     */
    Page<ProductEntity> findByNameContainingIgnoreCaseAndIsAvailableTrue(String name, Pageable pageable);
    
    /**
     * Busca produtos com seus tamanhos disponíveis
     */
    @Query("SELECT DISTINCT p FROM ProductEntity p " +
           "LEFT JOIN FETCH p.availableSizes ps " +
           "WHERE p.isAvailable = true " +
           "ORDER BY p.id")
    List<ProductEntity> findAllAvailableWithSizes();
    
    /**
     * Busca produtos por filtros múltiplos
     */
    @Query("SELECT p FROM ProductEntity p " +
           "WHERE p.isAvailable = true " +
           "AND (:team IS NULL OR LOWER(p.team) LIKE LOWER(CONCAT('%', :team, '%'))) " +
           "AND (:league IS NULL OR LOWER(p.league) LIKE LOWER(CONCAT('%', :league, '%'))) " +
           "AND (:category IS NULL OR p.category = :category)")
    Page<ProductEntity> findByFilters(@Param("team") String team, 
                                     @Param("league") String league, 
                                     @Param("category") ProductCategory category, 
                                     Pageable pageable);
}
