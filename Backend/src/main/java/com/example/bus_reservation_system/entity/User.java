package com.example.bus_reservation_system.entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;
    @Column( nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column( nullable = false)
    private String phone;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role=Role.USER;
    @Column(nullable = false)
    private int age;
    @Column(nullable = false)
    private String gender;



}