package com.soccershirt.repository;
import java.util.Optional; import org.springframework.data.jpa.repository.JpaRepository; import com.soccershirt.model.Coupon;
public interface CouponRepository extends JpaRepository<Coupon, Long>{ Optional<Coupon> findByCodeIgnoreCase(String code);}