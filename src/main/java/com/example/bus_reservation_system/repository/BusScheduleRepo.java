package com.example.bus_reservation_system.repository;

import com.example.bus_reservation_system.entity.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusScheduleRepo extends JpaRepository<BusSchedule, Long> {
}
