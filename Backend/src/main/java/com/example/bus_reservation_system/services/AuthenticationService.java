package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.User;
import com.example.bus_reservation_system.repositories.LoginUserDto;
import com.example.bus_reservation_system.repositories.RegisterUserDto;
import com.example.bus_reservation_system.repositories.UserDao;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserDao userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserDao userRepository,
        AuthenticationManager authenticationManager,
        BCryptPasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User signup(User input) {
        // Encode the password before saving
        input.setPassword(passwordEncoder.encode(input.getPassword()));
        return userRepository.save(input);
    }


    public User authenticate(LoginUserDto input) {
        // Authenticate using email and raw password
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );

        // Fetch and return the authenticated user
        return userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
