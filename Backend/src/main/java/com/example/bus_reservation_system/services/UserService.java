package com.example.bus_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.bus_reservation_system.entity.User;
import com.example.bus_reservation_system.repositories.UserDao;

@Service
public class UserService {
    @Autowired
    UserDao userDao;

    public User saveUser( User user) {
        return userDao.save(user);
    }

    public Optional<User> getUser(Long id){
        return userDao.findById(id);
    }
    public User findByName(String name){
        return userDao.findByName(name);
    }

    public List<User> getAllUser(){
        return userDao.findAll();
    }

    public void delete(long id){
        userDao.deleteById(id);
    }

    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User user){
        user.setName(user.getName());
        user.setEmail(user.getEmail());
        user.setPassword(user.getPassword());
        user.setPhone(user.getPhone());
        user.setRole(user.getRole());

        User updateUser = userDao.save(user);
        return ResponseEntity.ok(updateUser);
    }


}

