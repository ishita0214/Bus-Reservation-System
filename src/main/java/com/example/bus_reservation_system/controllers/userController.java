package com.example.bus_reservation_system.controllers;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bus_reservation_system.services.UserService;
import com.example.bus_reservation_system.entity.User;

@RestController
@RequestMapping("/user")
public class userController {
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
    public User saveUser(User user){
        return userService.saveUser(user);

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
