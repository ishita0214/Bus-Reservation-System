package com.example.bus_reservation_system.services;


import com.example.bus_reservation_system.entity.Route;
import com.example.bus_reservation_system.repositories.RouteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {


    private final RouteDao routeDao;

    @Autowired
    public RouteService(RouteDao routeRepo) {
        this.routeDao = routeRepo;
    }

    public List<Route> findAll() {
        return routeDao.findAll();
    }

    public Optional<Route> findById(long theId) {
        return routeDao.findById(theId);




    }

    public Route save(Route route) {
        return routeDao.save(route);
    }


    public void deleteById(long theId) {
        routeDao.deleteById(theId);
    }

    public ResponseEntity<Route> updateRoute(@PathVariable long id, @RequestBody Route route){
        route.setSource(route.getSource());
    route.setDestination(route.getDestination());

    
    Route updatedRoute = routeDao.save(route);
    return ResponseEntity.ok(updatedRoute);
    }

    //@PutMapping("/update/{id}")
//public ResponseEntity<Route> updateRoute(@PathVariable long id, @RequestBody Route route){
//    route.setSource(route.getSource());
//    route.setDestination(route.getDestination());
//    route.setDistance(route.getDistance());
//    route.setEstimatedTime(route.getEstimatedTime());
//
//    Route updatedRoute = routeDao.save(route);
//    return ResponseEntity.ok(updatedRoute);
//}

}
