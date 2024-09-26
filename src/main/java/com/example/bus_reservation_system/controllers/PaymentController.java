package com.example.bus_reservation_system.controllers;


import com.example.bus_reservation_system.entity.Payment;
import com.example.bus_reservation_system.repositories.PaymentDao;
import com.example.bus_reservation_system.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentDao paymentDao;

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService){
        this.paymentService = paymentService;
    }

    @GetMapping("/list")
    public List<Payment> findAll()
    {
        return paymentService.findAll();
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Payment> getPaymentbyId(@PathVariable("id") long id){
        Payment payment= paymentService.findById(id);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment){
        Payment newPayment = paymentService.save(payment);
        return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
    }


    @PutMapping("/update/{id}")
    public Optional<Payment> updatePayment(@PathVariable long id, @RequestBody Payment payment){
        return paymentService.updatePayment(id,payment);
    }

    @DeleteMapping("/deletePayment/{id}")
    public ResponseEntity<Payment> deletePaymentById(@PathVariable long id){
        paymentService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

