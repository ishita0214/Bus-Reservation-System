package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.entity.Payment;
import com.example.bus_reservation_system.repository.BusScheduleRepo;
import com.example.bus_reservation_system.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    private final PaymentRepo paymentRepo;

    @Autowired
    public PaymentService(PaymentRepo paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    public List<Payment> findAll() {
        return paymentRepo.findAll();
    }

    public Payment findById(long theId) {
        Optional<Payment> result = paymentRepo.findById(theId);

        Payment payment = null;

        if (result.isPresent()) {
            payment = result.get();
        } else {

            throw new RuntimeException("Did not find payment with id: " + theId);
        }

        return payment;
    }

    public Payment save(Payment payment) {
        return paymentRepo.save(payment);
    }


    public void deleteById(long theId) {
        paymentRepo.deleteById(theId);
    }
}
