package com.example.bus_reservation_system.repositories;

public class AuthResponse {

    private final String jwt;
 
    public AuthResponse(String jwt) {
        this.jwt = jwt;
    }
 
    public String getJwt() {
        return jwt;
    }
 }