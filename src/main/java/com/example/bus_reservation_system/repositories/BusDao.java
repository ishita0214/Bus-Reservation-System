package com.example.bus_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bus_reservation_system.entity.Bus;

public interface BusDao extends JpaRepository<Bus,Long> {
}
