package com.example.bus_reservation_system.repositories;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.bus_reservation_system.entity.Bus;

public interface BusDao extends JpaRepository<Bus,Long> {
 
    @Query(value="SELECT b.id, b.bus_number,b.bus_type,b.arr_time,b.dept_time,b.operator,b.route_id,b.price FROM bus_table b JOIN route r ON b.route_id = r.id JOIN bus_days bd ON b.id = bd.bus_id WHERE r.source = :source  AND r.destination = :destination AND bd.day_name = DAYNAME(:date)",nativeQuery=true)
 public   List<Bus> findBusesByRouteAndDay(@Param("source") String source, @Param("destination") String destination, @Param("date") String  date);
    
}
