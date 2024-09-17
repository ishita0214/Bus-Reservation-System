package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.repository.BusScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusScheduleService {

    private BusScheduleRepo busScheduleRepo;

    @Autowired
    public BusScheduleService(BusScheduleRepo busScheduleRepo) {
        this.busScheduleRepo=busScheduleRepo;
    }


}
