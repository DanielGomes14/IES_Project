package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.MQMessage;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.Type;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.SensorRepository;
import ies.proj.geanihouse.repository.TypeRepository;
import ies.proj.geanihouse.service.PermissionService;
import org.apache.juli.logging.Log;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.http.ResponseEntity;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins={ "*" }, allowedHeaders = "*")
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
    @Autowired
    private PermissionService permissionService;
    private  UserDetails authenticateduser;

    @GetMapping("/{division_id}/sensors")
    public ResponseEntity<?> getAllDivisionSensors(@PathVariable(value = "division_id") Long id) throws ResourceNotFoundException {
        Division division = this.divisionRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not find division with id" + id));
        this.authenticateduser =(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(division,this.authenticateduser)){
            return ResponseEntity.status(403).body("Can only Access Sensors of your Houses's Divisions!");
        };
        Set<Sensor> sensors = division.getSensors();
        return ResponseEntity.ok().body(sensors);
    }

    @PostMapping("/sensors")
    public ResponseEntity<?> addSensorToDivision(@Valid @RequestBody Sensor sensor) throws ResourceNotFoundException,ErrorDetails {
        Division d = divisionRepository.findById(sensor.getDivision().getId())
                     .orElseThrow(() -> new ResourceNotFoundException("Could not find division "));
        if(!this.permissionService.checkClientDivision(d,this.authenticateduser)){
            return ResponseEntity.status(403).body("Can only Add Sensors to your Houses's Divisions!");
        };
        Type t = typeRepository.findById(sensor.getType().getId()).
                orElseThrow(() -> new ResourceNotFoundException("Could not find Type of Sensor "));

        Sensor s = new Sensor();
        s.setDivision(d);s.setType(t);
        for(Sensor sens : d.getSensors()){
            if(sens.getType().getName().equals(s.getType().getName()) && !s.getType().getName().equals("Eletronic")){
                throw new ErrorDetails("Cannot add two sensors of the same type to the same division");
            }
        }
        sensorRepository.save(s);

        //publish to RabbitMQ the presence of a new Sensor
        LOG.info("ADDSENSOR, " + s.getId() + ", " + s.getType().getName());
        MQMessage msg = new MQMessage("ADDSENSOR",s.getId(),s.getType().getName(),0);
        source.output().send(MessageBuilder.withPayload(msg).build());
        return  ResponseEntity.ok().body("Successfully added new Sensor");
    }

    @DeleteMapping("sensors/{id}")
    public Map<String,Boolean> deleteSensor(@PathVariable(value = "id") Long sensorId )
        throws ResourceNotFoundException {
        Sensor sensor = sensorRepository.findById(sensorId)
                .orElseThrow(() -> new ResourceNotFoundException("Sensor not found for this id :: " + sensorId));

        this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Map<String,Boolean> response = new HashMap<>();
        if(! permissionService.checkClientDivision(sensor.getDivision(),this.authenticateduser)){
            // Forbidden!
            response.put("deleted",Boolean.FALSE);
            return response;
        }

        LOG.debug("Deleting sensor "+ sensor);
        LOG.info("REMOVESENSOR, " + sensor.getId() + ", " + sensor.getType().getName());

        MQMessage msg = new MQMessage("REMOVESENSOR",sensor.getId(),sensor.getType().getName(),0);
        source.output().send(MessageBuilder.withPayload(msg).build());
        LOG.info("Sucessfully published  msg to remove sensor");
        sensorRepository.delete(sensor);
        response.put("deleted",Boolean.TRUE);
        return response;
    }

}
