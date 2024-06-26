package com.example.bca.service;

import com.example.bca.model.AuthenticationResponse;
import com.example.bca.model.User;
import com.example.bca.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

//    public AuthenticationResponse register(User request) {
//        User user = new User();
//        user.setFirstName(request.getFirstName());
//        System.out.println(request.getLastname());
//        user.setLastname(request.getLastname());
//        user.setUsername(request.getUsername());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRole(request.getRole());
//
//        user = repository.save(user);
//        String token = jwtService.generateToken(user);
//        System.out.println(token);
//        return new AuthenticationResponse(token);
//    }


    public AuthenticationResponse register(User request) {
        // Check if the username already exists in the database
        if (repository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists. Please choose another username.");
        }

        // If the username is not taken, proceed with registration
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastname(request.getLastname());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user = repository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }



    public AuthenticationResponse authenticate(User request){
        authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                    )
        );
        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }
}
