package com.example.bca.controller;

import com.example.bca.model.AuthenticationResponse;
import com.example.bca.model.User;
import com.example.bca.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthenticationController {
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
}
