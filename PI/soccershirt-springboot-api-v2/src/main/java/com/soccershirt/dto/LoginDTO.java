package com.soccershirt.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginDTO {
    @Email @NotBlank private String email;
    @NotBlank private String password;
}
