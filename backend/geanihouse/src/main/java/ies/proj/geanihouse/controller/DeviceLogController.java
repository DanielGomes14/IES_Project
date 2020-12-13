package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.model.DeviceLog;
import ies.proj.geanihouse.repository.DeviceLogRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@RestController
public class DeviceLogController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private DeviceLogRepository deviceLogRepository;
    @GetMapping("/{id}/sensorlog/")
    public ResponseEntity<List<DeviceLog>> getHouseDeviceLog(@PathVariable(value = "id") long id){
        List<DeviceLog> data = deviceLogRepository.findAllByDevice_Division_Home_Id(id);
        for(DeviceLog d: data) LOG.info(d);
        return ResponseEntity.ok().body(data);
    }

}
