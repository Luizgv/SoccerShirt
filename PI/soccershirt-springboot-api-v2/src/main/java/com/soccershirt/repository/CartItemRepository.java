package com.soccershirt.repository;
import java.util.*; import org.springframework.data.jpa.repository.JpaRepository; import com.soccershirt.model.*;
public interface CartItemRepository extends JpaRepository<CartItem, Long>{ List<CartItem> findByUser(User u); java.util.Optional<CartItem> findByUserAndProduct(User u, Product p); void deleteByUser(User u);}