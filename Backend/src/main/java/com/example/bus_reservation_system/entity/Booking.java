package com.example.bus_reservation_system.entity;


import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;


public class Booking {
    private String operator;
    private Long bookingId;
    private String source;
    private String destination;
    private String reservationDate;
    private LocalTime arrTime;
    private LocalTime deptTime;
    private String busNumber;

    public Booking(String operator, LocalTime  deptTime,LocalTime  arrTime, String reservationDate, String destination, String source, Long bookingId,String busNumber) {
        this.operator = operator;
        this.deptTime = deptTime;
        this.arrTime = arrTime;
        this.reservationDate = reservationDate;
        this.destination = destination;
        this.source = source;
        this.bookingId = bookingId;
        this.busNumber=busNumber;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalTime  getArrTime() {
        return arrTime;
    }

    public void setArrTime(LocalTime  arrTime) {
        this.arrTime = arrTime;
    }

    public LocalTime  getDeptTime() {
        return deptTime;
    }

    public void setDeptTime(LocalTime  deptTime) {
        this.deptTime = deptTime;
    }
}
