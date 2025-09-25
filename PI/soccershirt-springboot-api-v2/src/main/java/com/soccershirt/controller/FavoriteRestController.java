package com.soccershirt.controller;

import com.soccershirt.model.Favorite;
import com.soccershirt.model.Product;
import com.soccershirt.model.User;
import com.soccershirt.repository.FavoriteRepository;
import com.soccershirt.repository.ProductRepository;
import com.soccershirt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteRestController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Product>> getFavorites(Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(401).build();
        }

        String email = auth.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(401).build();
        }

        User user = userOpt.get();
        List<Favorite> favorites = favoriteRepository.findByUserId(user.getId());
        List<Product> products = favorites.stream()
                .map(fav -> fav.getProduct())
                .collect(Collectors.toList());

        return ResponseEntity.ok(products);
    }

    @PostMapping("/{productId}")
    public ResponseEntity<String> toggleFavorite(@PathVariable Long productId, Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado");
        }

        String email = auth.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(401).body("Usuário não encontrado");
        }

        Optional<Product> productOpt = productRepository.findById(productId);
        if (!productOpt.isPresent()) {
            return ResponseEntity.status(404).body("Produto não encontrado");
        }

        User user = userOpt.get();
        Product product = productOpt.get();

        Optional<Favorite> existingFavorite = favoriteRepository.findByUserIdAndProductId(user.getId(), productId);

        if (existingFavorite.isPresent()) {
            // Remove from favorites
            favoriteRepository.delete(existingFavorite.get());
            return ResponseEntity.ok("Produto removido dos favoritos");
        } else {
            // Add to favorites
            Favorite favorite = Favorite.builder()
                    .user(user)
                    .product(product)
                    .build();
            favoriteRepository.save(favorite);
            return ResponseEntity.ok("Produto adicionado aos favoritos");
        }
    }
}
