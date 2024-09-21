package com.example.bus_reservation_system.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.apache.tomcat.util.bcel.classfile.Constant;

@Entity
@Data
@Table(name = "Admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String Admin;
}
