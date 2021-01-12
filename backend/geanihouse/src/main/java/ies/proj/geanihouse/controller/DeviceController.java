package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.*;
import ies.proj.geanihouse.repository.DeviceRepository;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.NotificationRepository;
import ies.proj.geanihouse.service.PermissionService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
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
import ies.proj.geanihouse.repository.TypeRepository;


import javax.validation.Valid;
import java.sql.Timestamp;
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
    private NotificationRepository notificationRepository;


    @Autowired
    Source source;

    @Autowired
    private PermissionService permissionService;

    private UserDetails authenticateduser;

    @GetMapping("/{id}/devices/")
    public ResponseEntity<?> getAllDivisionDevices(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Division division = this.divisionRepository.findById(id).
                orElseThrow( () -> new ResourceNotFoundException("Could not find division with id" + id));
        this.authenticateduser= (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(division,this.authenticateduser)){
           return  ResponseEntity.status(403).body("Cannot get Devices from a House you Dont Belong!");
        }
        Set <Device> devices = division.getDevices();

        return ResponseEntity.ok().body(devices);
    }

    @PostMapping("/device")
    public ResponseEntity<?> addDeviceToDivision(@Valid @RequestBody Device device) throws ResourceNotFoundException {
        Division d = divisionRepository.findById(device.getDivision().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Could not find division "));

        this.authenticateduser= (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(d,this.authenticateduser)){
            return  ResponseEntity.status(403).body("Cannot add Devices to a House you Dont Belong!");
        }

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
        
        return  ResponseEntity.ok().body("Successfully updated  Device");
    }

    @PutMapping("/devices")
    public ResponseEntity<?> updateDevice(@Valid @RequestBody Device device) throws ResourceNotFoundException {
        Device d = deviceRepository.findById(device.getId()).
        orElseThrow(() -> new ResourceNotFoundException("Could not find Type of Sensor "));
        this.authenticateduser= (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(d.getDivision(),this.authenticateduser)){
            ResponseEntity.status(403).body("Cannot update a Device from a House you Dont Belong!");
        }
        d.setState(device.getState());

        String state = d.getState()==0? " Off" : " On";
        //create notification
        Notification notf = new Notification(0,"Device State Update",
                "Device " + d.getName() + "is now " + state,
                new Timestamp(System.currentTimeMillis()),
                d.getDivision().getHome()
        );
        notificationRepository.save(notf);
        deviceRepository.save(d);
        return  ResponseEntity.ok().body("Successfully added new Device");
    }


    @DeleteMapping("/devices/{id}")
    public Map<String,Boolean> deleteDevice(@PathVariable(value = "id") Long deviceId) throws ResourceNotFoundException {
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow( () -> new ResourceNotFoundException("Division not found for this id :: " + deviceId));
        Map<String,Boolean> response = new HashMap<>();
        if(! permissionService.checkClientDivision(device.getDivision(),this.authenticateduser)){
            // Forbidden!
            response.put("deleted",Boolean.FALSE);
            return response;
        }
        LOG.info("Deleting device " + device);
        deviceRepository.delete(device);

        response.put("deleted",Boolean.TRUE);
        return response;
    }
}
