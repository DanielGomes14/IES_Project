package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.MQMessage;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.Type;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.SensorRepository;
import ies.proj.geanihouse.repository.TypeRepository;
import org.apache.juli.logging.Log;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.http.ResponseEntity;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;


@CrossOrigin(origins={ "http://localhost:3000" })
@EnableBinding(Source.class)
@RestController
public class SensorController implements  java.io.Serializable {
    private static final Logger LOG = LogManager.getLogger(SensorController.class);

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
    public ResponseEntity<?> addSensorToDivision(@Valid @RequestBody Sensor sensor) throws ResourceNotFoundException {
        Division d = divisionRepository.findById(sensor.getDivision().getId())
                     .orElseThrow(() -> new ResourceNotFoundException("Could not find division "));
        Type t = typeRepository.findById(sensor.getType().getId()).
                orElseThrow(() -> new ResourceNotFoundException("Could not find Type of Sensor "));
        Sensor s = new Sensor();
        s.setDivision(d);s.setType(t);
        sensorRepository.save(s);
        //publish to RabbitMQ the presence of a new Sensor
        LOG.info("ADDSENSOR, " + s.getId() + ", " + s.getType().getName());
        MQMessage msg = new MQMessage("ADDSENSOR",s.getId(),s.getType().getName(),0);
        source.output().send(MessageBuilder.withPayload(msg).build());
        return  ResponseEntity.ok().body("Successfully added new Sensor");
    }

    @DeleteMapping("sensors/{id}")
    public Map<String,Boolean> deleteSensor(@PathVariable(value = "id") Long sensorId )
        throws  ResourceNotFoundException{
        Sensor sensor = sensorRepository.findById(sensorId)
                .orElseThrow(() -> new ResourceNotFoundException("Sensor not found for this id :: " + sensorId));
        LOG.debug("Deleting sensor "+ sensor);
        LOG.info("REMOVESENSOR, " + sensor.getId() + ", " + sensor.getType().getName());
        MQMessage msg = new MQMessage("REMOVESENSOR",sensor.getId(),sensor.getType().getName(),0);
        source.output().send(MessageBuilder.withPayload(msg).build());
        LOG.info("Sucessfully published  msg to remove sensor");
        Map<String,Boolean> response = new HashMap<>();
        sensorRepository.delete(sensor);
        response.put("deleted",Boolean.TRUE);
        return response;
    }

}
