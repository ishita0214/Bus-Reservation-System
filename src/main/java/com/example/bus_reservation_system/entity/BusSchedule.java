package com.example.bus_reservation_system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.format.DateTimeFormatter;

@Entity
@Data
@Table(name = "Bus Schedule")
public class BusSchedule {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "bus")
    private Bus bus;
            //(ManyToOne relationship)

    @Column(name = "route")
    private Route route;
            //(ManyToOne relationship)

    @Column(name = "departure_time")
    private DateTimeFormatter departureTime;

    @Column(name = "arrival_time")
    private DateTimeFormatter arrivalTime;

    @Column(name = "availableSeats")
    private Integer availableSeats;

    @Column(name = "price_per_seat")
    private Double pricePerSeat;

}
