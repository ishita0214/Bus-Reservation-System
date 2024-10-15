package com.example.bus_reservation_system.services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.bus_reservation_system.entity.Bus;
import com.example.bus_reservation_system.repositories.BusDao;


@Service
public class BusService {
    @Autowired
    BusDao busDao;

    public Bus createBus(@RequestBody Bus bus){
        return busDao.save(bus);

    }

    public Optional<Bus> findBus(long id){
        return busDao.findById(id);

    }
    public List<Bus> getAllBus(){
        return busDao.findAll();
    }

    public void deleteBus(long id){
        busDao.deleteById(id);
    }

    public ResponseEntity<Bus> updateBus(@PathVariable long id, @RequestBody Bus bus){
        bus.setBusNumber(bus.getBusNumber());
        bus.setBusType(bus.getBusType());
    
        bus.setOperator(bus.getOperator());
     

        Bus updateBus = busDao.save(bus);
        return ResponseEntity.ok(updateBus);
    }
    public List<Bus> getBuses(String source, String destination, String date) {
        return busDao.findBusesByRouteAndDay(source, destination, date);
    }
}
