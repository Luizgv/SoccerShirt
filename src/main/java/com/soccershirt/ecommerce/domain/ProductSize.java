package com.soccershirt.ecommerce.domain;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

/**
 * Value object representando o tamanho de um produto com modificador de preço
 */
public record ProductSize(
        @NotNull Size size,
        @NotNull @PositiveOrZero BigDecimal priceModifier,
        @PositiveOrZero int stockQuantity,
        boolean isAvailable
) {
    
    public ProductSize {
        if (priceModifier == null) {
            priceModifier = BigDecimal.ZERO;
        }
    }
    
    /**
     * Cria um ProductSize com modificador de preço zero
     */
    public static ProductSize of(Size size, int stockQuantity) {
        return new ProductSize(size, BigDecimal.ZERO, stockQuantity, stockQuantity > 0);
    }
    
    /**
     * Cria um ProductSize com modificador de preço personalizado
     */
    public static ProductSize of(Size size, BigDecimal priceModifier, int stockQuantity) {
        return new ProductSize(size, priceModifier, stockQuantity, stockQuantity > 0);
    }
}
