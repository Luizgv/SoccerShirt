package com.soccershirt.repository;
import org.springframework.data.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import com.soccershirt.model.Product;
public interface ProductRepository extends JpaRepository<Product, Long>{
  Page<Product> findByCategoryIgnoreCase(String category, Pageable pageable);
}