package com.soccershirt.dto;

import lombok.Data;

@Data
public class CheckoutDTO {
  private String couponCode;
  private String paymentMethod; // 'card'|'pix'|'boleto'
  private String cardLast4;
}
