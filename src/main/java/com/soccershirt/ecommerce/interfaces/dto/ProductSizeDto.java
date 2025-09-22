package com.soccershirt.ecommerce.interfaces.dto;

import com.soccershirt.ecommerce.domain.Size;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

/**
 * DTO para transferência de dados de tamanho do produto
 */
public record ProductSizeDto(
        @NotNull Size size,
        @NotNull @PositiveOrZero BigDecimal priceModifier,
        @PositiveOrZero int stockQuantity,
        boolean isAvailable,
        @NotNull @PositiveOrZero BigDecimal finalPrice
) {}
