package com.soccershirt.ecommerce.infrastructure.persistence.entity;

import com.soccershirt.ecommerce.domain.ProductCategory;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
public class ProductEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String team;
    
    @Column(nullable = false)
    private String league;
    
    @Column(nullable = false)
    private String season;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductSizeEntity> availableSizes;
    
    private String imageUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductCategory category;
    
    @Column(nullable = false)
    private boolean isAvailable = true;
    
    // Construtores
    public ProductEntity() {}
    
    public ProductEntity(String name, String team, String league, String season, 
                        String description, BigDecimal basePrice, ProductCategory category) {
        this.name = name;
        this.team = team;
        this.league = league;
        this.season = season;
        this.description = description;
        this.basePrice = basePrice;
        this.category = category;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getTeam() {
        return team;
    }
    
    public void setTeam(String team) {
        this.team = team;
    }
    
    public String getLeague() {
        return league;
    }
    
    public void setLeague(String league) {
        this.league = league;
    }
    
    public String getSeason() {
        return season;
    }
    
    public void setSeason(String season) {
        this.season = season;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getBasePrice() {
        return basePrice;
    }
    
    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }
    
    public List<ProductSizeEntity> getAvailableSizes() {
        return availableSizes;
    }
    
    public void setAvailableSizes(List<ProductSizeEntity> availableSizes) {
        this.availableSizes = availableSizes;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public ProductCategory getCategory() {
        return category;
    }
    
    public void setCategory(ProductCategory category) {
        this.category = category;
    }
    
    public boolean isAvailable() {
        return isAvailable;
    }
    
    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
