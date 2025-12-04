package com.soccershirt.config;
import com.soccershirt.security.JwtAuthFilter;
import org.springframework.context.annotation.*; import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain; import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.*; import java.util.List;
@Configuration public class SecurityConfig {
  @Bean public SecurityFilterChain chain(HttpSecurity http, JwtAuthFilter jwt) throws Exception {
    http.csrf(c->c.disable()).cors(c->c.configurationSource(corsSource()))
      .authorizeHttpRequests(a->a.requestMatchers("/api/auth/**","/images/**","/api/products/**","/api/coupons/validate","/h2-console/**").permitAll().anyRequest().authenticated())
      .headers(h->h.frameOptions(frameOptions -> frameOptions.disable())) // Permite frames para H2 Console
      .addFilterBefore(jwt, BasicAuthenticationFilter.class);
    return http.build();
  }
  @Bean public PasswordEncoder encoder(){ return new BCryptPasswordEncoder(); }
  @Bean public CorsConfigurationSource corsSource(){ var cfg=new CorsConfiguration(); cfg.setAllowedOrigins(List.of("http://localhost:5173")); cfg.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS")); cfg.setAllowedHeaders(List.of("*")); var s=new UrlBasedCorsConfigurationSource(); s.registerCorsConfiguration("/**", cfg); return s; }
}
