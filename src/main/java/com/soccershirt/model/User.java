package com.soccershirt.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String fullName;
    @Email @NotBlank @Column(unique = true) private String email;
    @NotBlank private String password;
    private String phone;
    private String address;
    private String houseNumber;

    @Builder.Default
    private String roles = "ROLE_USER";
}
