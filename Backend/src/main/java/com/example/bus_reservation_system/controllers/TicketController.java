package com.example.bus_reservation_system.controllers;

import com.example.bus_reservation_system.entity.Ticket;
import com.example.bus_reservation_system.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins="http://localhost:4200")
public class TicketController {

    @Autowired
    TicketService ticketService;

    @PostMapping("/saveTicket")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){
        Ticket newTicket = ticketService.saveTicket(ticket);
        return new ResponseEntity<>(newTicket, HttpStatus.OK);
    }
}
