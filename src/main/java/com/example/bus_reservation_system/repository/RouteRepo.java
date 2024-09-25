package com.example.bus_reservation_system.repository;


import com.example.bus_reservation_system.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepo extends JpaRepository<Route,Long> {
}
