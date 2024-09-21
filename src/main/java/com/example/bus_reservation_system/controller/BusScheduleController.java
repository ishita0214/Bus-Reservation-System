package com.example.bus_reservation_system.controller;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.services.BusScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BusScheduleController {

    private BusScheduleService busScheduleService;

    @Autowired
    public BusScheduleController (BusScheduleService busScheduleService){
        this.busScheduleService=busScheduleService;
    }

    @GetMapping("/busScheduleList")
    public List<BusSchedule> findAll(){
        return busScheduleService.findAll();
    }

}
