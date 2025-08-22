package com.soccershirt.ecommerce.infrastructure.mapper;

import com.soccershirt.ecommerce.domain.Product;
import com.soccershirt.ecommerce.domain.ProductSize;
import com.soccershirt.ecommerce.infrastructure.persistence.entity.ProductEntity;
import com.soccershirt.ecommerce.infrastructure.persistence.entity.ProductSizeEntity;
import com.soccershirt.ecommerce.interfaces.dto.ProductDto;
import com.soccershirt.ecommerce.interfaces.dto.ProductSizeDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.math.BigDecimal;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    
    // Domain para Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "availableSizes", ignore = true)
    ProductEntity toEntity(Product product);
    
    // Entity para Domain
    Product toDomain(ProductEntity entity);
    
    // Domain para DTO
    @Mapping(target = "availableSizes", qualifiedByName = "mapSizesToDto")
    ProductDto toDto(Product product);
    
    // DTO para Domain
    Product toDomain(ProductDto dto);
    
    // ProductSize Domain para DTO
    @Named("mapSizesToDto")
    default List<ProductSizeDto> mapSizesToDto(List<ProductSize> sizes) {
        return sizes.stream()
                .map(this::mapSizeToDto)
                .toList();
    }
    
    @Named("mapSizeToDto")
    default ProductSizeDto mapSizeToDto(ProductSize size) {
        // Calculamos o preço final considerando o basePrice seria passado separadamente
        // Por simplicidade, usamos apenas o priceModifier aqui
        BigDecimal finalPrice = size.priceModifier();
        
        return new ProductSizeDto(
                size.size(),
                size.priceModifier(),
                size.stockQuantity(),
                size.isAvailable(),
                finalPrice
        );
    }
    
    // ProductSizeEntity para ProductSize
    ProductSize toProductSizeDomain(ProductSizeEntity entity);
    
    // Entity para DTO (método de conveniência)
    @Mapping(target = "availableSizes", qualifiedByName = "mapEntitySizesToDto")
    ProductDto entityToDto(ProductEntity entity);
    
    @Named("mapEntitySizesToDto")
    default List<ProductSizeDto> mapEntitySizesToDto(List<ProductSizeEntity> sizes) {
        return sizes.stream()
                .map(this::mapEntitySizeToDto)
                .toList();
    }
    
    @Named("mapEntitySizeToDto")
    default ProductSizeDto mapEntitySizeToDto(ProductSizeEntity entity) {
        BigDecimal basePrice = entity.getProduct().getBasePrice();
        BigDecimal finalPrice = basePrice.add(entity.getPriceModifier());
        
        return new ProductSizeDto(
                entity.getSize(),
                entity.getPriceModifier(),
                entity.getStockQuantity(),
                entity.isAvailable(),
                finalPrice
        );
    }
}
