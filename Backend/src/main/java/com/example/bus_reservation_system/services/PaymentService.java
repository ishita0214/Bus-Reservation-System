package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.Payment;
import com.example.bus_reservation_system.repositories.PaymentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

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

    public ResponseEntity<Payment> updatePayment(@PathVariable long id, @RequestBody Payment payment){
        payment.setReservation(payment.getReservation());
        payment.setPaymentMethod(payment.getPaymentMethod());
        payment.setPaymentStatus(payment.getPaymentStatus());
        payment.setTransactionId(payment.getTransactionId());
        payment.setPaymentDate(payment.getPaymentDate());
        payment.setAmountPaid(payment.getAmountPaid());

        Payment updatePayment = paymentDao.save(payment);
        return ResponseEntity.ok(updatePayment);
    }



}
