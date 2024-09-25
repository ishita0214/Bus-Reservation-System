package com.example.bus_reservation_system.controller;

import com.example.bus_reservation_system.entity.BusSchedule;
import com.example.bus_reservation_system.repository.BusScheduleRepo;
import com.example.bus_reservation_system.services.BusScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/busSchedule")
public class BusScheduleController {

    @Autowired
    private BusScheduleRepo busScheduleRepo;

    private BusScheduleService busScheduleService;

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

        busSchedule.setBus(busSchedule.getBus());
        busSchedule.setRoute(busSchedule.getRoute());
        busSchedule.setDepartureTime(busSchedule.getDepartureTime());
        busSchedule.setArrivalTime(busSchedule.getArrivalTime());
        busSchedule.setAvailableSeats(busSchedule.getAvailableSeats());
        busSchedule.setPricePerSeat(busSchedule.getPricePerSeat());


        BusSchedule updatedSchedule = busScheduleRepo.save(busSchedule);
        return ResponseEntity.ok(updatedSchedule);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BusSchedule> deleteBusScheduleById(@PathVariable long id){
        busScheduleService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
