package com.example.bca.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserResponse {
    Integer id;
    String firstName;
    String lastname;
    String username;
    String role;

}
