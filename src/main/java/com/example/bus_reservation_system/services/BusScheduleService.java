package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.repository.BusScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusScheduleService {

    private final BusScheduleRepo busScheduleRepo;

    @Autowired
    public BusScheduleService(BusScheduleRepo busScheduleRepo) {
        this.busScheduleRepo=busScheduleRepo;
    }

    public List<BusSchedule> findAll() {
        return busScheduleRepo.findAll();
    }
        public BusSchedule findById(long theId) {
        Optional<BusSchedule> result = busScheduleRepo.findById(theId);

        BusSchedule busSchedule = null;

        if (result.isPresent()) {
            busSchedule = result.get();
        }
        else {

            throw new RuntimeException("Did not find busSchedule with id: " + theId);
        }

        return busSchedule;
    }

    public BusSchedule save(BusSchedule busSchedule) {
        return busScheduleRepo.save(busSchedule);
    }


    public void deleteById(long theId) {
        busScheduleRepo.deleteById(theId);
    }


}






