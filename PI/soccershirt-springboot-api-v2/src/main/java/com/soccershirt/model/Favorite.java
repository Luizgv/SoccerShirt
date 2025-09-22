package com.soccershirt.model;
import jakarta.persistence.*; import lombok.*;
@Entity @Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Favorite {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @ManyToOne private User user;
  @ManyToOne private Product product;
}
