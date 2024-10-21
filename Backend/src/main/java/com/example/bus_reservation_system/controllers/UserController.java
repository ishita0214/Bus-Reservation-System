package com.example.bus_reservation_system.controllers;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bus_reservation_system.services.UserService;
import com.example.bus_reservation_system.entity.User;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="http://localhost:4200")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/findById/{id}")
    public  Optional<User> getUser(@PathVariable("id") long id){
        return userService.getUser(id);
    }

    @GetMapping("/list")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @PostMapping("/add")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") long id){
        userService.delete(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateBusSchedule(@PathVariable long id, @RequestBody User user){
        return userService.updateUser(id,user);
    }
    @GetMapping("/findByName/{name}")
    public  User findByName(@PathVariable("name") String name){
        return userService.findByName(name);
    }



}
