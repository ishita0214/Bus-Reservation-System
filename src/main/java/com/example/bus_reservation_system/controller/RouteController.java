package com.example.bus_reservation_system.controller;

import com.example.bus_reservation_system.entity.Route;
import com.example.bus_reservation_system.repository.RouteRepo;
import com.example.bus_reservation_system.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/route")
public class RouteController {

    @Autowired
    private RouteRepo routeRepo;

    private RouteService routeService;

    public RouteController(RouteService routeService){
        this.routeService=routeService;
    }

    @GetMapping("/list")
    public List<Route> findAll(){
        return routeService.findAll();
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Route> getRouteById(@PathVariable long id){
        Route route = routeService.findById(id);
        return new ResponseEntity<>(route, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Route> addRoute(@RequestBody Route route){
        Route newRoute = routeService.save(route);
        return new ResponseEntity<>(newRoute,HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Route> updateRoute(@PathVariable long id, @RequestBody Route route){
        route.setSource(route.getSource());
        route.setDestination(route.getDestination());
        route.setDistance(route.getDistance());
        route.setEstimatedTime(route.getEstimatedTime());

        Route updatedRoute = routeRepo.save(route);
        return ResponseEntity.ok(updatedRoute);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Route> deleteRouteById(@PathVariable long id){
        routeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
// {
//         "id": 1002,
//         "source": "Jaipur",
//         "destination": "Ahmedabad",
//         "distance": 3000.0,
//         "estimatedTime": "10:00:00"
//         },
