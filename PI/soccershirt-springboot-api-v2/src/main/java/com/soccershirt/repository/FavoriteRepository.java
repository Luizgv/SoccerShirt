package com.soccershirt.repository;
import java.util.*; import org.springframework.data.jpa.repository.JpaRepository; import com.soccershirt.model.*;
public interface FavoriteRepository extends JpaRepository<Favorite, Long>{ List<Favorite> findByUser(User u); java.util.Optional<Favorite> findByUserAndProduct(User u, Product p);}