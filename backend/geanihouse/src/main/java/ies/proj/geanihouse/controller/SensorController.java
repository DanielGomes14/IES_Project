package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
public class SensorController {
    @Autowired
    private SensorRepository sensorRepository;

    @PostMapping("/newsensor")
    public Sensor addSensorToDivision(@Valid @RequestBody Sensor sensor){
        return  sensorRepository.save(sensor);
    }

}
