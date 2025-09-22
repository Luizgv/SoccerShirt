package com.soccershirt.ecommerce.domain;

/**
 * Enum representando os tamanhos disponíveis para camisas
 */
public enum Size {
    XS("Extra Small"),
    S("Small"),
    M("Medium"),
    L("Large"),
    XL("Extra Large"),
    XXL("Double Extra Large"),
    XXXL("Triple Extra Large");
    
    private final String description;
    
    Size(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
    
    public String getDisplayName() {
        return this.name();
    }
}
