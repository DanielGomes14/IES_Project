package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.MQMessage;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.Type;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.SensorRepository;
import ies.proj.geanihouse.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.http.ResponseEntity;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;


@CrossOrigin(origins={ "http://localhost:3000" })
@EnableBinding(Source.class)
@RestController
public class SensorController implements  java.io.Serializable {
    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    Source source;

    @GetMapping("/{id}/sensors/")
    public ResponseEntity<?> getAllDivisionSensors(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Division division = this.divisionRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not find division with id" + id));
        Set<Sensor> sensors = division.getSensors();
        return ResponseEntity.ok().body(sensors);
    }

    @PostMapping("/newsensor")
    public Sensor addSensorToDivision(@Valid @RequestBody Sensor sensor) throws ResourceNotFoundException {
        System.out.println("-->"+ sensor.getDivision().getId() + sensor.getType().getId());
        Division d = divisionRepository.findById(sensor.getDivision().getId())
                     .orElseThrow(() -> new ResourceNotFoundException("Could not find division "));
        Type t = typeRepository.findById(sensor.getType().getId()).orElseThrow();
        Sensor s = new Sensor();
        s.setDivision(d);
        s.setType(t);
        //publish to RabbitMQ the presence of a new Sensor
        MQMessage msg = new MQMessage(s.getId(),sensor.getType().getName());
        source.output().send(MessageBuilder.withPayload(msg).build());
        return  sensorRepository.save(s);
    }

}
