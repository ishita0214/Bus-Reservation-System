package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.entity.Payment;
import com.example.bus_reservation_system.repositories.BusScheduleDao;
import com.example.bus_reservation_system.repositories.PaymentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    private final PaymentDao paymentDao;

    @Autowired
    public PaymentService(PaymentDao paymentRepo) {
        this.paymentDao = paymentRepo;
    }

    public List<Payment> findAll() {
        return paymentDao.findAll();
    }

    public Payment findById(long theId) {
        Optional<Payment> result = paymentDao.findById(theId);

        Payment payment = null;

        if (result.isPresent()) {
            payment = result.get();
        } else {

            throw new RuntimeException("Did not find payment with id: " + theId);
        }

        return payment;
    }

    public Payment save(Payment payment) {
        return paymentDao.save(payment);
    }


    public void deleteById(long theId) {
        paymentDao.deleteById(theId);
    }
}
