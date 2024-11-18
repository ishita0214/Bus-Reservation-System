package com.example.bus_reservation_system.entity;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class Details {
    private long id;
    private long reservation_id;
    private String name;
    private String gender;
    private int age;
    private String stateOfResidence;
    private String contactDetails;
    private int seatNumber;
}
