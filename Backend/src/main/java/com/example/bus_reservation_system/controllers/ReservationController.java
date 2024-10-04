package com.example.bus_reservation_system.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bus_reservation_system.entity.Reservation;
import com.example.bus_reservation_system.entity.User;
import com.example.bus_reservation_system.services.ReservationService;

@RestController
public class ReservationController {

    @Autowired
    ReservationService reservationService;

     @GetMapping("/getTicket/{id}")
    public  Optional<Reservation> getReservation(@PathVariable("id") long id){
        return reservationService.getTicket(id);
    }

    @GetMapping("/getAllTicket/{busId}")
    public List<Reservation> getAllTicket(@PathVariable("busId") Iterable<Long> busId){
        return reservationService.getAllTicket(busId);
    }

    @PostMapping("/createTicket")
    public ResponseEntity<Reservation> createTicket(@RequestBody Reservation reservation){
        Reservation newTicket = reservationService.createTicket(reservation);
        return new ResponseEntity<>(newTicket, HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteTicket/{id}")
    public void deleteTicket(@PathVariable("id") long id){
        reservationService.deleteTicket(id);}
}
