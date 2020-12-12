package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.SensorData;
import ies.proj.geanihouse.repository.SensorDataRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;
import java.util.List;

@RestController
public class SensorDataController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private SensorDataRepository sensorDataRepository;

    //House id!
    @GetMapping("/{id}/sensordata/")
    public List<SensorData> getHouseSensorData(@PathVariable(value = "id") long id){
        List<SensorData> data = sensorDataRepository.findAllBySensor_Division_Home_Id(id);
        for(SensorData d: data) LOG.info(d);
        return data;
    }




}
