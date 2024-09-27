package com.example.bus_reservation_system.controllers;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.repositories.BusScheduleDao;
import com.example.bus_reservation_system.services.BusScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/busSchedule")
public class BusScheduleController {

    @Autowired
    private BusScheduleDao busScheduleDao;

    private final BusScheduleService busScheduleService;

    @Autowired
    public BusScheduleController (BusScheduleService busScheduleService){
        this.busScheduleService=busScheduleService;
    }

    @GetMapping("/list")
    public List<BusSchedule> findAll(){
        return busScheduleService.findAll();
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<BusSchedule> getBusScheduleById(@PathVariable("id") long id){
        BusSchedule schedule = busScheduleService.findById(id);
        return new ResponseEntity<>(schedule, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<BusSchedule> addBusSchedule(@RequestBody BusSchedule busSchedule){
        BusSchedule newBusSchedule = busScheduleService.save(busSchedule);
        return new ResponseEntity<>(newBusSchedule, HttpStatus.CREATED);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BusSchedule> updateBusSchedule(@PathVariable long id, @RequestBody BusSchedule busSchedule){
        return busScheduleService.updateBusSchedule(id,busSchedule);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BusSchedule> deleteBusScheduleById(@PathVariable long id){
        busScheduleService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
