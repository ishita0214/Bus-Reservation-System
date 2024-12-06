package com.example.bus_reservation_system.controllers;

import java.util.List;
import java.util.Optional;

import com.example.bus_reservation_system.entity.Booking;
import com.example.bus_reservation_system.entity.Details;
import com.example.bus_reservation_system.entity.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bus_reservation_system.entity.Reservation;
import com.example.bus_reservation_system.entity.Status;
import com.example.bus_reservation_system.services.ReservationService;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins="http://localhost:4200")
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
    @GetMapping("/getTicketBySeatNumber/{seat}")
    public List<Reservation> getAllTicket(@PathVariable("seat") int seat){
        return reservationService.findAllBySeatNumber(seat);
    }

    @PostMapping("/createTicket")
    public ResponseEntity<Reservation> createTicket(@RequestBody Reservation reservation){
        if (reservation.getStatus() == null) {
            reservation.setStatus(Status.CONFIRMED);
        }
        Reservation newTicket = reservationService.createTicket(reservation);
        return new ResponseEntity<>(newTicket, HttpStatus.OK);
    }


    @DeleteMapping("/deleteTicket/{id}")
    public void deleteTicket(@PathVariable("id") long id){
        reservationService.deleteTicket(id);}


    @GetMapping("/search/userId/{userId}/busId/{busId}")
    public List<Reservation> getReservations(
            @PathVariable("userId") long userId,
            @PathVariable("busId") long busId) {
        return reservationService.getReservationsByUserIdAndBusId(userId,busId);
    }



    @GetMapping("/bookedSeats/{bus_id}/{date}")
    public List<Integer> getBookedSeats(@PathVariable("bus_id") long bus_id,
                                        @PathVariable("date") String date){
         return reservationService.getBookedSeats(bus_id,date);
    }

    @GetMapping("/getTicketsByBookingId/{bookingId}")
    public List<Reservation> getTicketsBYBookingId(@PathVariable("bookingId") long bookingId){
         return reservationService.findAllByBookingId(bookingId);
    }
    @GetMapping("/getTicketsByUserId/{UserId}")
    public List<Reservation> getTicketsByUserId(@PathVariable("UserId") long UserId){
        return reservationService.findAllByUserId(UserId);
    }
    @GetMapping("/getUserBookings/{userId}")
    public List<Booking> getUserBookings(@PathVariable("userId") long userId){
         return reservationService.getUserBookings(userId);
    }
    @GetMapping("/getPassengerDetails/{bookingId}")
    public List<Details> getPassengerDetails(@PathVariable("bookingId") long bookingId){
        return reservationService.getPassengerDetails(bookingId);
    }
    @PutMapping("/updateReservation/{id}")
    public Reservation updateReservation(@PathVariable("id") long id,@RequestBody Reservation reservation){
         return reservationService.updateReservation(id,reservation);
    }
}
