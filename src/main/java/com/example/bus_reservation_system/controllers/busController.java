package com.example.bus_reservation_system.controllers;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bus_reservation_system.Services.BusService;
import com.example.bus_reservation_system.entity.Bus;


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
    public Bus savebus(Bus bus){
        return busService.createBus(bus);

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
