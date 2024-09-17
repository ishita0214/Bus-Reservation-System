package com.example.bus_reservation_system.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private User user;

    @Column(nullable = false)
    private BusSchedule busSchedule;

    @Column(nullable = false)
    private LocalDateTime reservationDate;

    @Column(nullable = false)
    private int seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private double totalAmount;
}
