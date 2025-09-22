package com.soccershirt.ecommerce.interfaces.dto;

import com.soccershirt.ecommerce.domain.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para transferência de dados de produto
 */
public record ProductDto(
        Long id,
        @NotBlank String name,
        @NotBlank String team,
        @NotBlank String league,
        @NotBlank String season,
        String description,
        @Positive BigDecimal basePrice,
        @NotNull List<ProductSizeDto> availableSizes,
        String imageUrl,
        @NotNull ProductCategory category,
        boolean isAvailable
) {}
