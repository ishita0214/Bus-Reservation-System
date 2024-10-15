package com.example.bus_reservation_system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Stops")
public class Stops {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stop_id;

    @Column(name="route_id",nullable=false)
    private long route_id;

    @Column(name="stop_name",nullable=false)
    private String stop_name;
    
    @Column(name="distance",nullable=false)
    private int distance;
    
}
