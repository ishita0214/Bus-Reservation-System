package com.example.bus_reservation_system.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bus_reservation_system.entity.Coupon;


public interface CouponDao extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCode(String code);
}
