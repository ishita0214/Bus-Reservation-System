package com.example.bus_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bus_reservation_system.entity.User;

public interface UserDao extends JpaRepository<User,Long>{
}
