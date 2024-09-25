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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Double getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(Double pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bus")
    private Bus bus;
            //(ManyToOne relationship)

    @ManyToOne(fetch = FetchType.EAGER)
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
