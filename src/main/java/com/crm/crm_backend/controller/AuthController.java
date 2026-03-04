package com.crm.crm_backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.RequiredArgsConstructor;

import com.crm.crm_backend.model.User;
import com.crm.crm_backend.repository.UserRepository;
import com.crm.crm_backend.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        Optional<User> existingUser = userRepo.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepo.save(user);

        return ResponseEntity.ok("User registered successfully");
    }


    // LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        Optional<User> userOptional = userRepo.findByEmail(request.get("email"));

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.get("password"), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // GENERATE JWT TOKEN
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token,
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }
}