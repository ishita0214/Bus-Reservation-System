package com.example.bus_reservation_system.repositories;

import com.example.bus_reservation_system.entity.Booking;
import com.example.bus_reservation_system.entity.Details;
import com.example.bus_reservation_system.entity.Reservation;
import com.example.bus_reservation_system.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public interface ReservationDao extends JpaRepository<Reservation,Long> {
public List<Reservation> findBySeatNumber(int seatNumber);
    @Query(value = "SELECT r.id, r.user_id, r.bus_id, r.reservation_date, r.seat_number FROM reservation r JOIN user u ON r.user_id = u.id JOIN BusTable bt ON r.bus_id = bt.id WHERE r.user_id = :userId AND r.bus_id = :busId", nativeQuery = true)

    List<Reservation> findReservationByUserIdAndBusId(@Param("userId") long userId, @Param("busId") long busId);
    @Query(value="SELECT seat_number from reservation where bus_id=:bus_id and reservation_date=:date",nativeQuery = true)
    List<Integer> getBookedSeats(@Param("bus_id") long bus_id,@Param("date") String date);
    List<Reservation> findAllByBookingId(long bookingId);
    List<Reservation> findAllByUserId(long userId);
    @Query(value = "SELECT DISTINCT b.operator, r.booking_id, route.source, route.destination, r.reservation_date, b.arr_time, b.dept_time, b.bus_number, b.id, r.status " +
            "FROM reservation r " +
            "JOIN bus_table b ON r.bus_id = b.id " +
            "JOIN route route ON b.route_id = route.id " +
            "WHERE r.user_id = :userId " +
            "AND r.booking_id IN ( " +
            "    SELECT MIN(booking_id) " +
            "    FROM reservation " +
            "    WHERE user_id = :userId " +
            "    GROUP BY booking_id " +
            ");", nativeQuery = true)
    List<Object[]> getRawUserBookings(@Param("userId") long userId);


    default List<Booking> getUserBookings(long userId) {
        List<Object[]> rawResults = getRawUserBookings(userId);
        List<Booking> bookings = new ArrayList<>();

        for (Object[] row : rawResults) {
            LocalTime arrTime = ((java.sql.Time) row[5]).toLocalTime();
            LocalTime deptTime = ((java.sql.Time) row[6]).toLocalTime();
            String busNumber = (String) row[7];
            Long busId = (Long) row[8]; // Retrieve busId from the result set
            String status = (String) row[9]; // Retrieve status from the result set

            bookings.add(new Booking(
                    (String) row[0],        // operator
                    deptTime,               // deptTime
                    arrTime,                // arrTime
                    (String) row[4],        // reservationDate
                    (String) row[3],        // destination
                    (String) row[2],        // source
                    (Long) row[1],          // bookingId
                    busNumber,              // busNumber
                    busId,                  // busId
                    status                  // status
            ));
        }

        return bookings;
    }


    @Query(value = "SELECT t.id, t.contact_details, t.state_of_residence, t.reservation_id, t.name, t.age, t.gender ,r.seat_number,r.status" +
            " FROM ticket t " +
            "JOIN reservation r ON r.id = t.reservation_id " +
            "WHERE r.booking_id = :bookingId", nativeQuery = true)
    List<Object[]> getRawPassengerDetails(@Param("bookingId") long bookingId);

    default List<Details> getPassengerDetails(long bookingId) {
        List<Object[]> rawResults = getRawPassengerDetails(bookingId);
        List<Details> tickets = new ArrayList<>();

        for (Object[] row : rawResults) {
            Details ticket = new Details();
            ticket.setId((Long) row[0]);
            ticket.setContactDetails((String) row[1]);
            ticket.setStateOfResidence((String) row[2]);
            ticket.setReservation_id((Long) row[3]);
            ticket.setName((String) row[4]);
            ticket.setAge((Integer) row[5]);
            ticket.setGender((String) row[6]);
            ticket.setSeatNumber((Integer) row[7]);
            ticket.setStatus((String)row[8]);


            tickets.add(ticket);
        }

        return tickets;
    }

}

