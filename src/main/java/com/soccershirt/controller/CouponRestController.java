package com.soccershirt.controller;
import com.soccershirt.model.Coupon; import com.soccershirt.repository.CouponRepository; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/coupons") @RequiredArgsConstructor
public class CouponRestController {
  private final CouponRepository repo;
  @GetMapping("/validate") public Coupon validate(@RequestParam String code){
    return repo.findByCodeIgnoreCase(code).filter(Coupon::isActive).orElseThrow(() -> new RuntimeException("Cupom inválido"));
  }
}
