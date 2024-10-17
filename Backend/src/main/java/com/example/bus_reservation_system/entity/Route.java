package com.example.bus_reservation_system.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "Route")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

   
}
