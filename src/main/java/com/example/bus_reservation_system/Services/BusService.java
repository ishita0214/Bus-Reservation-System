package com.example.bus_reservation_system.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public Optional<Bus> updateBus(long id,@RequestBody Bus bus){
        Optional<Bus> oldBus=busDao.findById(id);
        return oldBus.map((data)->{
            data.setBusNumber(bus.getBusNumber());
            data.setBusType(bus.getBusType());
            data.setCapacity(bus.getCapacity());
            data.setOperator(bus.getOperator());
            data.setStatus(bus.getStatus());
            return busDao.save(data);

        });

    }
    
}
