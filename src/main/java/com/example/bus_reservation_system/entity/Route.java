package com.example.bus_reservation_system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.sql.Time;

@Entity
@Data
@Table(name = "Route")
public class Route {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "source")
    private String source;

    @Column(name = "destination")
    private String destination;

    @Column(name = "distance")
    private Double distance;

    @Column(name = "estimated_time")
    private Time estimatedTime;
}
