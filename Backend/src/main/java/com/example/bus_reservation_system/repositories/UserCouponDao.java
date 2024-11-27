package com.example.bus_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bus_reservation_system.entity.UserCoupon;
@Repository
public interface UserCouponDao extends JpaRepository<UserCoupon,Long>{
    
    
}
