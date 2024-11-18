package com.example.bus_reservation_system.controllers;

import com.example.bus_reservation_system.entity.Reservation;
import com.example.bus_reservation_system.entity.Ticket;
import com.example.bus_reservation_system.repositories.TicketDao;
import com.example.bus_reservation_system.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins="http://localhost:4200")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/saveTicket")
    public ResponseEntity<Ticket> addPassengers(@RequestBody Ticket passengers) {
        Ticket savedPassengers = ticketService.saveAll(passengers);
        return ResponseEntity.ok(savedPassengers);
    }

    @DeleteMapping("/deleteTicket/{id}")
    public ResponseEntity<?> deletePassengers(@PathVariable("id") long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.ok().body("{\"message\": \"deleted\"}");
    }
}
