package com.example.bus_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.bus_reservation_system.entity.Bus;
import com.example.bus_reservation_system.entity.Reservation;
import com.example.bus_reservation_system.repositories.ReservationRepo;

@Service
public class ReservationService {
    @Autowired
    ReservationRepo reservationRepo;
    
   public Reservation createTicket(@RequestBody Reservation res){
        return reservationRepo.save(res);

    }

    public void deleteTicket(long id){
        reservationRepo.deleteById(id);
    }

    public Optional<Reservation> getTicket(long id){
        return reservationRepo.findById(id);
    }

    public List<Reservation> getAllTicket(Iterable<Long> busId){
        return reservationRepo.findAllById(busId);
    }
}
