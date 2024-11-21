package com.example.bus_reservation_system.entity;

import java.util.List;

import lombok.Data;
@Data
public class EmailPayload {
    private String to;
    private String bookingId;
    private String source;
    private String destination;
    private String deptTime;
    private String arrTime;
    private String date;
    private String operator;
    private List<String> passengers;
    private List<Integer> seatNumbers;

    // Getters and setters
}
