package com.example.bca.controller;

import com.example.bca.dto.ErrorMessage;
import com.example.bca.dto.TokenRequest;
import com.example.bca.dto.UserResponse;
import com.example.bca.model.AuthenticationResponse;
import com.example.bca.model.User;
import com.example.bca.repository.UserRepository;
import com.example.bca.service.AuthenticationService;
import com.example.bca.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class AuthenticationController {
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User user){
        return ResponseEntity.ok(authenticationService.register(user)); //returns token after register
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user){
        return ResponseEntity.ok(authenticationService.authenticate(user)); //login check and returns token
    }

    @GetMapping("/demo")
    ResponseEntity<String> getVideo(){
        return ResponseEntity.ok("Video he re");
    }

    @GetMapping("/getUser/{token}")
    ResponseEntity<?> getUser(@PathVariable("token") TokenRequest token){
        System.out.println(token);
        ErrorMessage errorMessage = new ErrorMessage("No token involved");
        if(token == null) return ResponseEntity.badRequest().body(errorMessage);
        else {
            String user =  jwtService.extractUsername(token.getToken());
            User userdetail = userRepository.findByUsername(user).orElseThrow(()->new RuntimeException("User not found"));
            UserResponse userResponse = new UserResponse();
            userResponse.setId(userdetail.getId());
            userResponse.setFirstName(userdetail.getFirstName());
            userResponse.setLastname(userdetail.getLastname());
            userResponse.setUsername(userdetail.getUsername());
            userResponse.setRole(String.valueOf(userdetail.getRole()));
            return ResponseEntity.ok(userResponse);
        }
    }
}
