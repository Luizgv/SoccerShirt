package com.soccershirt.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDTO {
    @NotBlank private String fullName;
    @Email @NotBlank private String email;
    @NotBlank private String password;
    private String phone;
    private String address;
    private String houseNumber;
}
