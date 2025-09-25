package com.soccershirt.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import com.soccershirt.model.*;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User u);
    List<Favorite> findByUserId(Long userId);
    Optional<Favorite> findByUserAndProduct(User u, Product p);
    Optional<Favorite> findByUserIdAndProductId(Long userId, Long productId);
}