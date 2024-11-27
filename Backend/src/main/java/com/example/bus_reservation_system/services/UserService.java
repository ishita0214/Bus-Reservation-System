package com.example.bus_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.bus_reservation_system.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.bus_reservation_system.repositories.UserDao;

@Service
public class UserService {
    @Autowired
    UserDao userDao;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public User saveUser(User user) {
        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userDao.save(user);
    }

    public Optional<User> getUser(Long id) {
        return userDao.findById(id);
    }

    public   Optional<User> findByName(String name) {
        return userDao.findByFullName(name);
    }
    public   Optional<User> findByEmail(String email) {
        return userDao.findByEmail(email);
    }
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public void delete(long id) {
        userDao.deleteById(id);
    }

    public ResponseEntity<User> updateUser(long id, User user) {
        Optional<User> existingUserOpt = userDao.findById(id);
        
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setFullName(user.getFullName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhone(user.getPhone());
            existingUser.setRole(user.getRole());
            existingUser.setAge(user.getAge());
            existingUser.setGender(user.getGender());

            User updatedUser = userDao.save(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}