package com.example.bus_reservation_system.entity;

import java.time.LocalDateTime;

public class Payment {

    private long id;

    private Reservation reservation;

    private String paymentMethod;

    private String paymentStatus;

    private String transactionId;

    private LocalDateTime paymentDate;

    private double amountPaid;

}
