package com.example.bus_reservation_system.controllers;
import java.util.*;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bus_reservation_system.services.BusService;
import com.example.bus_reservation_system.entity.Bus;


@Slf4j
@RestController
public class BusController {
    @Autowired
    BusService busService;

    @GetMapping("/getBus/{id}")
    public  Optional<Bus> getBus(@PathVariable("id") long id){
        return busService.findBus(id);
    }

    @GetMapping("/getAll")
    public List<Bus> getAllBuses(){
        return busService.getAllBus();
    }

    @PostMapping("/saveBus")
    public ResponseEntity<Bus> saveBus(@RequestBody Bus bus){
        Bus newBus = busService.createBus(bus);
        return new ResponseEntity<>(newBus, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteBus/{id}")
    public void deleteBus(@PathVariable("id") long id){
        busService.deleteBus(id);
    } 
    
    @PutMapping("/updateBus/{id}")
    public Optional<Bus> updateBus(@PathVariable("id")
                                       long id,Bus bus){
        return busService.updateBus(id,bus);
    }
}
