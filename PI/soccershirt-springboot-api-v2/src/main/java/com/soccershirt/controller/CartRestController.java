package com.soccershirt.controller;
import com.soccershirt.dto.CheckoutDTO; import com.soccershirt.model.*; import com.soccershirt.repository.*; import lombok.RequiredArgsConstructor; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*;
import java.util.*; import java.math.BigDecimal;
@RestController @RequestMapping("/api/cart") @RequiredArgsConstructor
public class CartRestController {
  private final CartItemRepository cart; private final UserRepository users; private final ProductRepository products; private final OrderRepository orders; private final CouponRepository coupons;
  private User me(Authentication a){ return users.findByEmail(a.getName()).orElseThrow(); }
  @GetMapping public List<CartItem> list(Authentication a){ return cart.findByUser(me(a)); }
  @PostMapping("/add/{productId}") public void add(@PathVariable Long productId, Authentication a){
    var u=me(a); var p=products.findById(productId).orElseThrow();
    var it = cart.findByUserAndProduct(u,p).orElse(null);
    if(it==null){ it=CartItem.builder().user(u).product(p).quantity(1).build(); } else { it.setQuantity(it.getQuantity()+1); }
    cart.save(it);
  }
  @PostMapping("/qty/{id}") public void qty(@PathVariable Long id, @RequestParam int q){ var it=cart.findById(id).orElseThrow(); it.setQuantity(Math.max(1,q)); cart.save(it); }
  @DeleteMapping("/{id}") public void remove(@PathVariable Long id){ cart.deleteById(id); }
  @PostMapping("/checkout") public Map<String,Object> checkout(@RequestBody CheckoutDTO dto, Authentication a){
    var u=me(a); var items=cart.findByUser(u);
    var subtotal=items.stream().map(i->i.getProduct().getPrice().multiply(new BigDecimal(i.getQuantity()))).reduce(BigDecimal.ZERO, BigDecimal::add);
    BigDecimal discount = BigDecimal.ZERO;
    if(dto.getCouponCode()!=null && !dto.getCouponCode().isBlank()){
      var c = coupons.findByCodeIgnoreCase(dto.getCouponCode()).filter(Coupon::isActive).orElse(null);
      if(c!=null && subtotal.compareTo(c.getMinTotal())>=0){ discount = subtotal.multiply(c.getPercent()); }
    }
    BigDecimal taxes = subtotal.subtract(discount).multiply(new BigDecimal("0.10")); // 10% fictício
    BigDecimal shipping = BigDecimal.ZERO; // grátis
    BigDecimal total = subtotal.subtract(discount).add(taxes).add(shipping);
    orders.save(Order.builder().user(u).total(total).discount(discount).taxes(taxes).shipping(shipping).createdAt(java.time.LocalDateTime.now()).build());
    cart.deleteByUser(u);
    return Map.of("status","ok","subtotal",subtotal,"discount",discount,"taxes",taxes,"shipping",shipping,"total",total);
  }
}
