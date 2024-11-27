package com.example.bus_reservation_system.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bus_reservation_system.entity.User;
@Repository
public interface UserDao extends JpaRepository<User,Long>{
    Optional<User> findByFullName(String name);
    Optional<User> findByEmail(String email);

}
