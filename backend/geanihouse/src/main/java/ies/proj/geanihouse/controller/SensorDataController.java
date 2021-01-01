package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.SensorData;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.SensorDataRepository;
import ies.proj.geanihouse.repository.SensorRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins={ "http://localhost:3000" })
@RestController
public class SensorDataController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private SensorDataRepository sensorDataRepository;
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private SensorRepository sensorRepository;
    //Division id! All sensordata in a division
    @GetMapping("divisions/{id}/sensordata/")
    public ResponseEntity<?>  getDivisionSensorData(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Division d =this.divisionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find home with id :: "+ id));
        List<SensorData> data = sensorDataRepository.findAllBySensor_Division_Id(id);
        for(SensorData sd: data) LOG.info(sd);
        return ResponseEntity.ok().body(data);
    }
    //get sensor data of a specific sensor
    @GetMapping("/sensors/{id}/sensordata/")
    public ResponseEntity<?> getSensorData(
            @PathVariable(value = "id") long sensorid, @RequestParam(required = false,defaultValue = "false") Boolean latest)
            throws Throwable {
        Sensor s = sensorRepository.findById(sensorid)
                .orElseThrow( () -> new ResourceNotFoundException("Could not find Sensor with id :: " + sensorid));
        if(latest!=null && latest){
                List<SensorData> sensorData = sensorDataRepository.findFirstBySensor_IdOrderByTimestampDateDesc(sensorid);
                sensorData.forEach(sa -> LOG.debug(sa.getTimestampDate()));
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
        LOG.debug("Deleting sensorData "+ sensorData);
        sensorDataRepository.delete(sensorData);
        Map<String,Boolean> response = new HashMap<String,Boolean>();
        response.put("deleted",Boolean.TRUE);
        return  response;
    }
}
