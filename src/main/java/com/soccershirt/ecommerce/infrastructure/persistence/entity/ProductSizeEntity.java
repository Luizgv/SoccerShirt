package com.soccershirt.ecommerce.infrastructure.persistence.entity;

import com.soccershirt.ecommerce.domain.Size;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "product_sizes")
public class ProductSizeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal priceModifier = BigDecimal.ZERO;
    
    @Column(nullable = false)
    private int stockQuantity;
    
    @Column(nullable = false)
    private boolean isAvailable = true;
    
    // Construtores
    public ProductSizeEntity() {}
    
    public ProductSizeEntity(ProductEntity product, Size size, BigDecimal priceModifier, int stockQuantity) {
        this.product = product;
        this.size = size;
        this.priceModifier = priceModifier != null ? priceModifier : BigDecimal.ZERO;
        this.stockQuantity = stockQuantity;
        this.isAvailable = stockQuantity > 0;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public ProductEntity getProduct() {
        return product;
    }
    
    public void setProduct(ProductEntity product) {
        this.product = product;
    }
    
    public Size getSize() {
        return size;
    }
    
    public void setSize(Size size) {
        this.size = size;
    }
    
    public BigDecimal getPriceModifier() {
        return priceModifier;
    }
    
    public void setPriceModifier(BigDecimal priceModifier) {
        this.priceModifier = priceModifier;
    }
    
    public int getStockQuantity() {
        return stockQuantity;
    }
    
    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
        this.isAvailable = stockQuantity > 0;
    }
    
    public boolean isAvailable() {
        return isAvailable;
    }
    
    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
