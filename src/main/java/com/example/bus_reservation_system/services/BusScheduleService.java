package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.repositories.BusScheduleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class BusScheduleService {

    private final BusScheduleDao busScheduleDao;

    @Autowired
    public BusScheduleService(BusScheduleDao busScheduleRepo) {
        this.busScheduleDao = busScheduleRepo;
    }

    public List<BusSchedule> findAll() {
        return busScheduleDao.findAll();
    }

    public BusSchedule findById(long theId) {
        Optional<BusSchedule> result = busScheduleDao.findById(theId);

        BusSchedule busSchedule = null;

        if (result.isPresent()) {
            busSchedule = result.get();
        } else {

            throw new RuntimeException("Did not find busSchedule with id: " + theId);
        }

        return busSchedule;
    }

    public BusSchedule save(BusSchedule busSchedule) {
        return busScheduleDao.save(busSchedule);
    }


    public void deleteById(long theId) {
        busScheduleDao.deleteById(theId);
    }

    public ResponseEntity<BusSchedule> updateBusSchedule(@PathVariable long id, @RequestBody BusSchedule busSchedule){
        busSchedule.setPricePerSeat(busSchedule.getPricePerSeat());
        busSchedule.setBus(busSchedule.getBus());
        busSchedule.setAvailableSeats(busSchedule.getAvailableSeats());
        busSchedule.setRoute(busSchedule.getRoute());
        busSchedule.setDepartureTime(busSchedule.getDepartureTime());
        busSchedule.setArrivalTime(busSchedule.getArrivalTime());

        BusSchedule updateBusSchedule = busScheduleDao.save(busSchedule);
        return ResponseEntity.ok(updateBusSchedule);
    }


}






