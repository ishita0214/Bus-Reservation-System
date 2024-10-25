package com.example.bus_reservation_system.repositories;

import com.example.bus_reservation_system.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationDao extends JpaRepository<Reservation,Long> {
    @Query(value = "SELECT r.id, r.user_id, r.bus_id, r.reservation_date, r.seat_number FROM reservation r JOIN user u ON r.user_id = u.id JOIN BusTable bt ON r.bus_id = bt.id WHERE r.user_id = :userId AND r.bus_id = :busId", nativeQuery = true)

    List<Reservation> findReservationByUserIdAndBusId(@Param("userId") long userId, @Param("busId") long busId);
    @Query(value="SELECT seat_number from reservation where bus_id=:bus_id and reservation_date=:date",nativeQuery = true)
    List<Integer> getBookedSeats(@Param("bus_id") long bus_id,@Param("date") String date);
}

