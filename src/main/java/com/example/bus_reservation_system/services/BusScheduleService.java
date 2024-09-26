package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.repositories.BusScheduleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.swing.text.html.Option;
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

    public Optional<BusSchedule> updateBusSchedule(long id, @RequestBody BusSchedule busSchedule){
        Optional<BusSchedule> oldBusSchedule = busScheduleDao.findById(id);
        return oldBusSchedule.map((data)->{
            data.setBus(data.getBus());
            data.setRoute(data.getRoute());
            data.setDepartureTime(data.getDepartureTime());
            data.setArrivalTime(data.getArrivalTime());
            data.setAvailableSeats(data.getAvailableSeats());
            data.setPricePerSeat(data.getPricePerSeat());

            return busScheduleDao.save(data);
        });


    }


}






