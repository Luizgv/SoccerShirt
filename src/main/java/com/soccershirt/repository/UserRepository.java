package com.soccershirt.repository;
import java.util.*; import org.springframework.data.jpa.repository.JpaRepository; import com.soccershirt.model.User;
public interface UserRepository extends JpaRepository<User, Long>{ Optional<User> findByEmail(String email); boolean existsByEmail(String email);}