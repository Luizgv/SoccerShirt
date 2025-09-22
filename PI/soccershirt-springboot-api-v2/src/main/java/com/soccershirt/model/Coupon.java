package com.soccershirt.model;
import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Entity @Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Coupon {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(unique=true) private String code;
  private BigDecimal percent; // 0.10 = 10%
  private boolean active;
  private BigDecimal minTotal;
}
