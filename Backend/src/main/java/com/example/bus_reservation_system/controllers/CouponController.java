package com.example.bus_reservation_system.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bus_reservation_system.entity.Coupon;
import com.example.bus_reservation_system.services.CouponService;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins="http://localhost:4200")
public class CouponController {
    @Autowired
    private CouponService couponService;

    @PostMapping("/validate")
    public ResponseEntity<Coupon> validateCoupon(@RequestParam String code, @RequestParam Double bookingAmount) {
        Coupon coupon = couponService.validateCoupon(code, bookingAmount);
        return ResponseEntity.status(200).body(coupon);
    }
}
