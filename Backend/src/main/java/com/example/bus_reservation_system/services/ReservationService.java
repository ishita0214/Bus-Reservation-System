package com.example.bus_reservation_system.services;

import java.util.List;
import java.util.Optional;

import com.example.bus_reservation_system.entity.Booking;
import com.example.bus_reservation_system.entity.Details;
import com.example.bus_reservation_system.entity.Ticket;
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
    public List<Reservation> findAllByBookingId(long bookingId){
       return reservationDao.findAllByBookingId(bookingId);
    }

    public List<Reservation> findAllByUserId(long UserId){
        return reservationDao.findAllByUserId(UserId);
    }
    public List<Booking> getUserBookings(long userId){
       return reservationDao.getUserBookings(userId);
    }
    public List<Details> getPassengerDetails(long bookingId){
        return reservationDao.getPassengerDetails(bookingId);
    }
    public List<Reservation> findAllBySeatNumber(int seat){
        return reservationDao.findBySeatNumber(seat);
    }
    public Reservation updateReservation(long id, Reservation updatedReservation) {
        Optional<Reservation> existingReservationOptional = reservationDao.findById(id);
        if (existingReservationOptional.isPresent()) {
            Reservation existingReservation = existingReservationOptional.get();


            existingReservation.setUserId(updatedReservation.getUserId());
            existingReservation.setBus_id(updatedReservation.getBus_id());
            existingReservation.setReservationDate(updatedReservation.getReservationDate());
            existingReservation.setSeatNumber(updatedReservation.getSeatNumber());
            existingReservation.setBookingId(updatedReservation.getBookingId());
            existingReservation.setStatus(updatedReservation.getStatus());


            return reservationDao.save(existingReservation);
        } else {

            throw new RuntimeException("Reservation not found with ID: " + id);
        }
    }
}