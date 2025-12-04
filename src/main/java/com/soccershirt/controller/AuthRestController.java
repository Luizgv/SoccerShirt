package com.soccershirt.controller;
import com.soccershirt.dto.*; import com.soccershirt.model.User; import com.soccershirt.repository.UserRepository; import com.soccershirt.security.JwtService;
import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.security.core.Authentication; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/auth") @RequiredArgsConstructor
public class AuthRestController {
  private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
  @PostMapping("/register") public void register(@RequestBody @Valid RegisterDTO d){
    if(users.existsByEmail(d.getEmail())) throw new RuntimeException("E-mail já cadastrado");
    var u = User.builder().fullName(d.getFullName()).email(d.getEmail()).password(encoder.encode(d.getPassword()))
      .phone(d.getPhone()).address(d.getAddress()).houseNumber(d.getHouseNumber()).build();
    users.save(u);
  }
  @PostMapping("/login") public TokenDTO login(@RequestBody @Valid LoginDTO d){
    var u = users.findByEmail(d.getEmail()).orElseThrow(() -> new RuntimeException("Credenciais inválidas"));
    if(!encoder.matches(d.getPassword(), u.getPassword())) throw new RuntimeException("Credenciais inválidas");
    String token = jwt.generate(u.getEmail(), Map.of("name", u.getFullName()));
    return new TokenDTO(token);
  }
  
  @GetMapping("/me") public Map<String, Object> getCurrentUser(Authentication auth){
    var u = users.findByEmail(auth.getName()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    return Map.of(
      "id", u.getId(),
      "fullName", u.getFullName(),
      "email", u.getEmail(),
      "phone", u.getPhone() != null ? u.getPhone() : "",
      "address", u.getAddress() != null ? u.getAddress() : "",
      "houseNumber", u.getHouseNumber() != null ? u.getHouseNumber() : ""
    );
  }
}
