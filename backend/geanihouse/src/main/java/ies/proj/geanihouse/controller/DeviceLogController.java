package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.DeviceLog;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.repository.DeviceLogRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class DeviceLogController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private DeviceLogRepository deviceLogRepository;
    @Autowired
    private HomeRepository homeRepository;
    @GetMapping("/sensorlog/{id}")
    public ResponseEntity<?> getHouseDeviceLog(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Home h = homeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not found home with id" + id));
        List<DeviceLog> data = deviceLogRepository.findAllByDevice_Division_Home_Id(id);
        for(DeviceLog d: data) LOG.info(d);
        return ResponseEntity.ok().body(data);
    }

    @DeleteMapping("/sensorlog/{id}")
    public Map<String,Boolean> deleteDeviceLog(@PathVariable(value = "id") long deviceLogId)
            throws  ResourceNotFoundException{
        DeviceLog deviceLog = deviceLogRepository.findById(deviceLogId)
                .orElseThrow( () ->  new ResourceNotFoundException("Could not found DeviceLog with id" + deviceLogId));
        LOG.debug("deleting house: "+ deviceLog);
        deviceLogRepository.delete(deviceLog);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return  response;
    }

}
