package com.example.bus_reservation_system.repositories;

import com.example.bus_reservation_system.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketDao extends JpaRepository<Ticket,Long> {
}
