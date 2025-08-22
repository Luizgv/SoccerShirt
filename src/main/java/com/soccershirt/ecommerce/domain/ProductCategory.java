package com.soccershirt.ecommerce.domain;

/**
 * Enum representando as categorias de produtos
 */
public enum ProductCategory {
    HOME("Home Jersey", "Camisa titular"),
    AWAY("Away Jersey", "Camisa visitante"),
    THIRD("Third Jersey", "Terceira camisa"),
    GOALKEEPER("Goalkeeper Jersey", "Camisa de goleiro"),
    RETRO("Retro Jersey", "Camisa retrô"),
    TRAINING("Training Jersey", "Camisa de treino");
    
    private final String englishName;
    private final String portugueseName;
    
    ProductCategory(String englishName, String portugueseName) {
        this.englishName = englishName;
        this.portugueseName = portugueseName;
    }
    
    public String getEnglishName() {
        return englishName;
    }
    
    public String getPortugueseName() {
        return portugueseName;
    }
    
    public String getDisplayName() {
        return portugueseName;
    }
}
