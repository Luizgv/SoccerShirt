package com.soccershirt.config;

import com.soccershirt.model.*;
import com.soccershirt.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProductRepository productRepo, 
                              CouponRepository couponRepo, 
                              UserRepository userRepo,
                              PasswordEncoder passwordEncoder) {
        return args -> {
            log.info("Iniciando carga de dados no H2...");
            
            // Carregamento de Produtos
            if (productRepo.count() == 0) {
                log.info("Carregando produtos...");
                productRepo.saveAll(List.of(
                    // Times Brasileiros
                    Product.builder()
                        .name("Camisa São Paulo I")
                        .team("São Paulo")
                        .category("Nacional")
                        .imageUrl("/images/spfc.jpg")
                        .price(new BigDecimal("299.00"))
                        .oldPrice(new BigDecimal("399.00"))
                        .rating(4.5)
                        .build(),
                    Product.builder()
                        .name("Camisa Corinthians I")
                        .team("Corinthians")
                        .category("Nacional")
                        .imageUrl("/images/corinthians.jpg")
                        .price(new BigDecimal("299.00"))
                        .oldPrice(new BigDecimal("399.00"))
                        .rating(4.6)
                        .build(),
                    Product.builder()
                        .name("Camisa Palmeiras I")
                        .team("Palmeiras")
                        .category("Nacional")
                        .imageUrl("/images/palmeiras.jpg")
                        .price(new BigDecimal("289.00"))
                        .oldPrice(new BigDecimal("379.00"))
                        .rating(4.4)
                        .build(),
                    Product.builder()
                        .name("Camisa Santos I")
                        .team("Santos")
                        .category("Nacional")
                        .imageUrl("/images/santos.jpg")
                        .price(new BigDecimal("279.00"))
                        .oldPrice(new BigDecimal("369.00"))
                        .rating(4.3)
                        .build(),
                    Product.builder()
                        .name("Camisa Flamengo I")
                        .team("Flamengo")
                        .category("Nacional")
                        .imageUrl("/images/flamengo.jpg")
                        .price(new BigDecimal("319.00"))
                        .oldPrice(new BigDecimal("419.00"))
                        .rating(4.8)
                        .build(),
                    // Times Internacionais
                    Product.builder()
                        .name("Camisa Barcelona I")
                        .team("Barcelona")
                        .category("Internacional")
                        .imageUrl("/images/barcelona.jpg")
                        .price(new BigDecimal("459.00"))
                        .oldPrice(new BigDecimal("559.00"))
                        .rating(4.9)
                        .build(),
                    Product.builder()
                        .name("Camisa Real Madrid I")
                        .team("Real Madrid")
                        .category("Internacional")
                        .imageUrl("/images/realmadrid.jpg")
                        .price(new BigDecimal("449.00"))
                        .oldPrice(new BigDecimal("549.00"))
                        .rating(4.8)
                        .build(),
                    Product.builder()
                        .name("Camisa Manchester United I")
                        .team("Manchester United")
                        .category("Internacional")
                        .imageUrl("/images/manutd.jpg")
                        .price(new BigDecimal("419.00"))
                        .oldPrice(new BigDecimal("519.00"))
                        .rating(4.6)
                        .build()
                ));
                log.info("✅ {} produtos carregados!", productRepo.count());
            }

            // Carregamento de Cupons
            if (couponRepo.count() == 0) {
                log.info("Carregando cupons...");
                couponRepo.saveAll(List.of(
                    Coupon.builder()
                        .code("BEMVINDO10")
                        .percent(new BigDecimal("0.10"))
                        .active(true)
                        .minTotal(new BigDecimal("150.00"))
                        .build(),
                    Coupon.builder()
                        .code("FUTEBOL15")
                        .percent(new BigDecimal("0.15"))
                        .active(true)
                        .minTotal(new BigDecimal("250.00"))
                        .build(),
                    Coupon.builder()
                        .code("BRASIL20")
                        .percent(new BigDecimal("0.20"))
                        .active(true)
                        .minTotal(new BigDecimal("400.00"))
                        .build(),
                    Coupon.builder()
                        .code("INTERNACIONAL25")
                        .percent(new BigDecimal("0.25"))
                        .active(true)
                        .minTotal(new BigDecimal("500.00"))
                        .build()
                ));
                log.info("✅ {} cupons carregados!", couponRepo.count());
            }

            // Carregamento de Usuários de Teste
            if (userRepo.count() == 0) {
                log.info("Carregando usuários de teste...");
                userRepo.saveAll(List.of(
                    User.builder()
                        .fullName("Admin Sistema")
                        .email("admin@soccershirt.com")
                        .password(passwordEncoder.encode("admin123"))
                        .phone("(11) 99999-9999")
                        .address("Rua dos Desenvolvedores")
                        .houseNumber("123")
                        .roles("ROLE_ADMIN")
                        .build(),
                    User.builder()
                        .fullName("João Silva")
                        .email("joao@teste.com")
                        .password(passwordEncoder.encode("123456"))
                        .phone("(11) 98888-8888")
                        .address("Rua dos Testes")
                        .houseNumber("456")
                        .roles("ROLE_USER")
                        .build(),
                    User.builder()
                        .fullName("Maria Santos")
                        .email("maria@teste.com")
                        .password(passwordEncoder.encode("123456"))
                        .phone("(11) 97777-7777")
                        .address("Avenida das Funcionalidades")
                        .houseNumber("789")
                        .roles("ROLE_USER")
                        .build()
                ));
                log.info("✅ {} usuários carregados!", userRepo.count());
            }

            log.info("🎉 Carga de dados concluída com sucesso!");
        };
    }
}
