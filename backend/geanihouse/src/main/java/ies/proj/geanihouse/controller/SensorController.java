package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.MQMessage;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins={ "http://localhost:3000" })
@EnableBinding(Source.class)
@RestController
public class SensorController {
    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    Source source;


    @PostMapping("/newsensor")
    public Sensor addSensorToDivision(@Valid @RequestBody Sensor sensor){
        System.out.println("-->"+ sensor.getDivision());
        //publish to RabbitMQ the presence of a new Sensor
        //MQMessage msg = new MQMessage(sensor.getId(),sensor.getType().getName());
        //  source.output().send(MessageBuilder.withPayload(msg).build());
        return  sensorRepository.save(sensor);
    }

}
