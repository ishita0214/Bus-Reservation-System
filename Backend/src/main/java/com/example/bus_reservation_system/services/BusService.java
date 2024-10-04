package com.example.bus_reservation_system.services;

import java.util.List;
import java.util.Optional;

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
        bus.setCapacity(bus.getCapacity());
        bus.setOperator(bus.getOperator());
        bus.setStatus(bus.getStatus());

        Bus updateBus = busDao.save(bus);
        return ResponseEntity.ok(updateBus);
    }

}
