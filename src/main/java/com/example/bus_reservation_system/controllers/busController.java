package com.example.bus_reservation_system.controllers;
import java.util.*;

import com.example.bus_reservation_system.entity.BusSchedule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bus_reservation_system.services.BusService;
import com.example.bus_reservation_system.entity.Bus;


@Slf4j
@RestController
public class busController {
    @Autowired
    BusService busService;

    @GetMapping("/getbus/{id}")
    public  Optional<Bus> getbus(@PathVariable("id") long id){
        return busService.findBus(id);
    }

    @GetMapping("/getAll")
    public List<Bus> getAllbus(){
        return busService.getAllBus();
    }

    @PostMapping("/savebus")
    public ResponseEntity<Bus> savebus(@RequestBody Bus bus){
        Bus newBus = busService.createBus(bus);
        return new ResponseEntity<>(newBus, HttpStatus.CREATED);
    }


    @DeleteMapping("/deletebus/{id}")
    public void deletebus(@PathVariable("id") long id){
        busService.deleteBus(id);
    } 
    
    @PutMapping("/updatebus/{id}")
    public Optional<Bus> updatebus(@PathVariable("id") long id,Bus bus){
        return busService.updateBus(id,bus);
    }
}
