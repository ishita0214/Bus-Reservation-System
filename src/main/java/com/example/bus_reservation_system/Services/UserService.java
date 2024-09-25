package com.example.bus_reservation_system.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.bus_reservation_system.entity.User;
import com.example.bus_reservation_system.repositories.UserDao;

@Service
public class UserService {
    @Autowired
    UserDao userDao;

    public User saveUser(@RequestBody User user) {
        return userDao.save(user);

    }

    public Optional<User> getUser(Long id){
        return userDao.findById(id);
            
        
    }

    public List<User> getAllUser(){
        return userDao.findAll();
    }

    public void delete(long id){
        userDao.deleteById(id);
    }

    public Optional<Object> updatUser(long id,@RequestBody User user){
        Optional<User> oldUser=userDao.findById(id);
        return oldUser.map((data)->{
            data.setName(user.getName());
            data.setEmail(user.getEmail());
            data.setPassword(user.getPassword());
            data.setPhone(user.getPhone());
            data.setRole(user.getRole());
            return userDao.save(data);


        });
    }

}
