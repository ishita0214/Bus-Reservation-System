package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.Ticket;
import com.example.bus_reservation_system.repositories.TicketDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TicketService {
    @Autowired
    TicketDao ticketDao;

    public Ticket saveAll(Ticket  ticket){
        return ticketDao.save(ticket);
    }

    public void deleteTicket(long id){
        ticketDao.deleteById(id);
    }


}
