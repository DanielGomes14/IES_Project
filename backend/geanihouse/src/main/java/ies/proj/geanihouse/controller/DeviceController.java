package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Device;
import ies.proj.geanihouse.repository.DeviceRepository;
import ies.proj.geanihouse.repository.DivisionRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.integration.support.MessageBuilder;
import ies.proj.geanihouse.model.MQMessage;
import ies.proj.geanihouse.model.Type;
import ies.proj.geanihouse.repository.TypeRepository;


import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;


@CrossOrigin(origins={ "*" }, allowedHeaders = "*")
@RestController
public class DeviceController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private DivisionRepository divisionRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    Source source;

    @GetMapping("/{id}/devices/")
    public ResponseEntity<?> getAllHomeDivisions(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Division division = this.divisionRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not find division with id" + id));
        Set <Device> devices = division.getDevices();

        System.out.println(devices);

        return ResponseEntity.ok().body(devices);
    }

    @PostMapping("/newdevices")
    public ResponseEntity<?> addDeviceToDivision(@Valid @RequestBody Device device) throws ResourceNotFoundException {
        Division d = divisionRepository.findById(device.getDivision().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Could not find division "));

        Type t = typeRepository.findById(device.getType().getId()).
        orElseThrow(() -> new ResourceNotFoundException("Could not find Type of Sensor "));

        Device dev = new Device();
        dev.setDivision(d); dev.setType(t); dev.setName(device.getName());

        deviceRepository.save(dev);

        if (!dev.getType().getName().equals("eletronic")) {
            //publish to RabbitMQ the presence of a new Device
            LOG.info("ADDDEVICE, " + dev.getId() + ", " + dev.getType().getName());
            MQMessage msg = new MQMessage("ADDDEVICE",dev.getId(),dev.getType().getName(), 0);
            source.output().send(MessageBuilder.withPayload(msg).build());
            
        }
        
        return  ResponseEntity.ok().body("Successfully added new Device");
    }

    @PutMapping("/devices")
    public ResponseEntity<?> updateDevice(@Valid @RequestBody Device device) throws ResourceNotFoundException {
        Device n = deviceRepository.findById(device.getId()).
        orElseThrow(() -> new ResourceNotFoundException("Could not find Type of Sensor "));;
        n.setState(device.getState());
        deviceRepository.save(n);
        return  ResponseEntity.ok().body("Successfully added new Device");
    }


    @DeleteMapping("/devices/{id}")
    public Map<String,Boolean> deleteDevice(@PathVariable(value = "id") Long deviceId) throws ResourceNotFoundException {
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow( () -> new ResourceNotFoundException("Division not found for this id :: " + deviceId));
        LOG.debug("Deleteting device " + device);
        deviceRepository.delete(device);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
    }
}
