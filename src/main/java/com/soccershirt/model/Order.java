package com.soccershirt.model;
import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal; import java.time.LocalDateTime;
@Entity @Data @NoArgsConstructor @AllArgsConstructor @Builder @Table(name="orders")
public class Order {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @ManyToOne private User user; private BigDecimal total; private BigDecimal discount; private BigDecimal taxes; private BigDecimal shipping;
  private LocalDateTime createdAt;
}
