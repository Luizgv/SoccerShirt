package com.soccershirt.repository;
import org.springframework.data.jpa.repository.JpaRepository; import com.soccershirt.model.Order;
public interface OrderRepository extends JpaRepository<Order, Long>{}