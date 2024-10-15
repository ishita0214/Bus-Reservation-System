package com.example.bus_reservation_system.controllers;
import java.util.*;

import com.example.bus_reservation_system.entity.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bus_reservation_system.services.BusService;
import com.example.bus_reservation_system.entity.Bus;


@Slf4j
@RestController
@RequestMapping("/api/bus")
@CrossOrigin(origins="http://localhost:4200")
public class BusController {
    @Autowired
    BusService busService;

    @GetMapping("/find/{id}")
    public  Optional<Bus> getBus(@PathVariable("id") long id){
        return busService.findBus(id);
    }

    @GetMapping("/list")
    public List<Bus> getAllBuses(){
        return busService.getAllBus();
    }

    @PostMapping("/add")
    public ResponseEntity<Bus> saveBus(@RequestBody Bus bus){
        Bus newBus = busService.createBus(bus);
        return new ResponseEntity<>(newBus, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBus(@PathVariable("id") long id){
        busService.deleteBus(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Bus> updateBusSchedule(@PathVariable long id, @RequestBody Bus bus){
        return busService.updateBus(id,bus);
    }
    @GetMapping("/search/{source}/{destination}/{date}")
    public List<Bus> getBuses(
            @PathVariable("source") String source,
            @PathVariable("destination") String destination,
            @PathVariable("date") String date) {
    
       return busService.getBuses(source, destination, date);
    }
    
}
