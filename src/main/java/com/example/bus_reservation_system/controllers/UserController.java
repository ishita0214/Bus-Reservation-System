package com.example.bus_reservation_system.controllers;
import java.util.*;

import com.example.bus_reservation_system.entity.Bus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bus_reservation_system.services.UserService;
import com.example.bus_reservation_system.entity.User;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/getUser/{id}")
    public  Optional<User> getUser(@PathVariable("id") long id){
        return userService.getUser(id);
    }

    @GetMapping("/getAll")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @PostMapping("/saveUser")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable("id") long id){
        userService.delete(id);
    } 
    
    @PutMapping("/updateUser/{id}")
    public Optional<Object> updateUser(@PathVariable("id") long id,User user){
        return userService.updatUser(id,user);
    }

}
