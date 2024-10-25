package com.example.bus_reservation_system.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="user_id",nullable=false)
    private long user_id;

    @Column(name="bus_id",nullable=false)
    private long bus_id;

    @Column(nullable = false)
    private String reservationDate;

    @Column(nullable = false)
    private int seatNumber;



    @Column(nullable = false)
    private long bookingId;




}
