package com.example.bus_reservation_system.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Coupon{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long id;
    @Column(nullable=false,unique=true)
    private String code;
    private String description;
    @Column(nullable=false)
    private Double discount;
    @Column(nullable=false)
    private LocalDateTime expiryDate;
    @Column(nullable=false)
    private Boolean isActive;
    @Column(nullable=false)
    private Double minBookingAmount;
   
    
}
