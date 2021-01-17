package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.SensorData;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.SensorDataRepository;
import ies.proj.geanihouse.repository.SensorRepository;
import ies.proj.geanihouse.service.PermissionService;
import ies.proj.geanihouse.service.SensorDataService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class SensorDataController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private SensorDataRepository sensorDataRepository;
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private SensorDataService sensorDataService;

    //Division id! All sensordata in a division
    @GetMapping("divisions/{division_id}/sensordata")
    public ResponseEntity<?>  getDivisionSensorData(
            @PathVariable(value = "division_id") long id,
            @RequestParam(required = false) List<String> types,
            @RequestParam(required = false)   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME ) LocalDateTime start_date,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end_date
            )
            throws ResourceNotFoundException {
        Division d =this.divisionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find home with id :: "+ id));
        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(d,authenticateduser)){
            return ResponseEntity.status(403).body("Cannot get Data from Sensors you don't have access");
        }
        List<SensorData> sensorData_list = this.sensorDataService.filterData(id,types,start_date,end_date);

        return ResponseEntity.ok().body( sensorData_list);
    }





    //get sensor data of a specific sensor
    @GetMapping("/sensors/{sensor_id}/sensordata")
    public ResponseEntity<?> getSensorData(
            @PathVariable(value = "sensor_id") long sensorid, @RequestParam(required = false,defaultValue = "false") Boolean latest)
            throws Throwable {
        Sensor s = sensorRepository.findById(sensorid)
                .orElseThrow( () -> new ResourceNotFoundException("Could not find Sensor with id :: " + sensorid));

        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(s.getDivision(),authenticateduser)){
            return ResponseEntity.status(403).body("Cannot get Data from Sensors you don't have access");
        }
        if(latest!=null && latest){
                List<SensorData> sensorData = sensorDataRepository.findFirstBySensor_IdOrderByTimestampDateDesc(sensorid);
                return ResponseEntity.ok().body(sensorData);
        }
        else{
            List<SensorData> sensorData= sensorDataRepository.findAllBySensor_Id(sensorid);
            return ResponseEntity.ok().body(sensorData);
        }
    }

    @DeleteMapping("sensordata/{id}")
    public Map<String,Boolean> removeSensorData(@PathVariable(value = "id") long id ) throws  ResourceNotFoundException{
        SensorData sensorData = this.sensorDataRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not found sensor' data  with id :: "+ id));
        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String,Boolean> response = new HashMap<>();
        if(! permissionService.checkClientDivision(sensorData.getSensor().getDivision(),authenticateduser)){
            // Forbidden!
            response.put("deleted",Boolean.FALSE);
            return response;
        }
        LOG.debug("Deleting sensorData "+ sensorData);
        sensorDataRepository.delete(sensorData);
        response.put("deleted",Boolean.TRUE);
        return  response;
    }
}
