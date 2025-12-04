package com.soccershirt.model;
import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Entity @Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Product {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  private String name; private String team; private String category; private String imageUrl;
  private BigDecimal price; private BigDecimal oldPrice; private Double rating;
}
