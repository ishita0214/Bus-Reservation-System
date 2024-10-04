package com.example.bus_reservation_system.repositories;

import com.example.bus_reservation_system.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepo extends JpaRepository<Reservation,Long> {
}
