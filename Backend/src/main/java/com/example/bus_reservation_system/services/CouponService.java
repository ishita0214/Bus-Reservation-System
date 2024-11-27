package com.example.bus_reservation_system.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bus_reservation_system.entity.Coupon;
import com.example.bus_reservation_system.repositories.CouponDao;

@Service
public class CouponService {
    @Autowired
    private CouponDao couponDao;

      public Coupon validateCoupon(String code, Double bookingAmount) {
        Coupon coupon = couponDao.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Invalid coupon code"));
System.out.println(coupon);
        if (!coupon.getIsActive() || coupon.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Coupon has expired or is inactive");
        }

        if (bookingAmount < coupon.getMinBookingAmount()) {
            throw new RuntimeException("Minimum booking amount not met for this coupon");
        }

        return coupon;
    }
    
}
