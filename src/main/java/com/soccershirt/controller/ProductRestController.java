package com.soccershirt.controller;

import com.soccershirt.model.Product;
import com.soccershirt.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductRestController {
    private final ProductRepository repo;

    @GetMapping
    public Page<Product> list(@RequestParam(required = false) String category,
                              @RequestParam(defaultValue = "relevance") String sort,
                              @RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "8") int size) {
        Sort s;
        if ("price_asc".equalsIgnoreCase(sort)) {
            s = Sort.by(Sort.Direction.ASC, "price");
        } else if ("price_desc".equalsIgnoreCase(sort)) {
            s = Sort.by(Sort.Direction.DESC, "price");
        } else if ("rating_desc".equalsIgnoreCase(sort)) {
            s = Sort.by(Sort.Direction.DESC, "rating").and(Sort.by("id"));
        } else {
            s = Sort.by(Sort.Direction.DESC, "rating").and(Sort.by("id"));
        }

        Pageable p = PageRequest.of(page, size, s);
        if (category != null && !category.trim().isEmpty()) {
            return repo.findByCategoryIgnoreCase(category, p);
        }
        return repo.findAll(p);
    }

    @GetMapping("/categories")
    public List<String> categories() {
        return repo.findAll().stream()
                .map(Product::getCategory)
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
}
