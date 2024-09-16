package com.example.bus_reservation_system.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Bus Schedule")
public class BusSchedule {
    @Id
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus")
    private Bus bus;
            //(ManyToOne relationship)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route")
    private Route route;
            //(ManyToOne relationship)

    @Column(name = "departure_time")
    private LocalDateTime departureTime;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    @Column(name = "availableSeats")
    private Integer availableSeats;

    @Column(name = "price_per_seat")
    private Double pricePerSeat;

}
