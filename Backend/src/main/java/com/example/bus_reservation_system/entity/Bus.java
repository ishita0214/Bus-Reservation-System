package com.example.bus_reservation_system.entity;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "BusTable")
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bus_number", unique = true, nullable = false)
    private String busNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "bus_type", nullable = false)
    private BusType busType;

    @Column(name="arrTime",nullable=false)
    private Time arrTime;

    @Column(name="deptTime",nullable=false)
    private Time deptTime;

    @Column(name="route_id",nullable=false)
    private long route_id; 

    @Column(nullable = false)
    private String operator;

    @Column(nullable=false)
    private int price;

}
