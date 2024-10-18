package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.Ticket;
import com.example.bus_reservation_system.repositories.TicketDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class TicketService {
    @Autowired
    TicketDao ticketDao;

    public Ticket saveTicket(@RequestBody Ticket ticket){
        return ticketDao.save(ticket);
    }
}
