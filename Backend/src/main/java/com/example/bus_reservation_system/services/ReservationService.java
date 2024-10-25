package com.example.bus_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.bus_reservation_system.entity.Reservation;
import com.example.bus_reservation_system.repositories.ReservationDao;

@Service
public class ReservationService {
    @Autowired
    ReservationDao reservationDao;

   public Reservation createTicket(@RequestBody Reservation res){
        return reservationDao.save(res);
    }

    public void deleteTicket(long id){
        reservationDao.deleteById(id);
    }

    public Optional<Reservation> getTicket(long id){
        return reservationDao.findById(id);
    }

    public List<Reservation> getAllTicket(Iterable<Long> busId){
        return reservationDao.findAllById(busId);
    }

    public List<Reservation> getReservationsByUserIdAndBusId(Long userId, Long busId) {
        return reservationDao.findReservationByUserIdAndBusId(userId,busId);

    }
    public List<Integer> getBookedSeats(long bus_id, String date){
       return reservationDao.getBookedSeats(bus_id,date);
    }
}