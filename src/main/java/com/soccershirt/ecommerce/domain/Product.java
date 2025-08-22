package com.soccershirt.ecommerce.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

/**
 * Entidade de domínio representando um produto (camisa de futebol)
 */
public record Product(
        @NotNull Long id,
        @NotBlank String name,
        @NotBlank String team,
        @NotBlank String league,
        @NotBlank String season,
        @NotBlank String description,
        @Positive BigDecimal basePrice,
        @NotNull List<ProductSize> availableSizes,
        String imageUrl,
        @NotNull ProductCategory category,
        boolean isAvailable
) {
    
    public Product {
        if (availableSizes == null || availableSizes.isEmpty()) {
            throw new IllegalArgumentException("Product must have at least one size available");
        }
    }
    
    /**
     * Calcula o preço baseado no tamanho
     */
    public BigDecimal getPriceForSize(Size size) {
        return availableSizes.stream()
                .filter(ps -> ps.size() == size)
                .map(ps -> basePrice.add(ps.priceModifier()))
                .findFirst()
                .orElse(basePrice);
    }
    
    /**
     * Verifica se o tamanho está disponível
     */
    public boolean isSizeAvailable(Size size) {
        return availableSizes.stream()
                .anyMatch(ps -> ps.size() == size && ps.isAvailable());
    }
}
