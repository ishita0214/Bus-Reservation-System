package com.example.bus_reservation_system.services;

import com.example.bus_reservation_system.entity.Route;
import com.example.bus_reservation_system.repository.RouteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {


    private final RouteRepo routeRepo;

    @Autowired
    public RouteService(RouteRepo routeRepo) {
        this.routeRepo = routeRepo;
    }

    public List<Route> findAll() {
        return routeRepo.findAll();
    }

    public Route findById(long theId) {
        Optional<Route> result = routeRepo.findById(theId);

        Route route = null;

        if (result.isPresent()) {
            route = result.get();
        } else {

            throw new RuntimeException("Did not find route with id: " + theId);
        }

        return route;
    }

    public Route save(Route route) {
        return routeRepo.save(route);
    }


    public void deleteById(long theId) {
        routeRepo.deleteById(theId);
    }


}
