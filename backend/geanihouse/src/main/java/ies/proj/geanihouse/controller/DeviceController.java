package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Device;
import ies.proj.geanihouse.repository.DeviceRepository;
import ies.proj.geanihouse.repository.DivisionRepository;
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

import javax.validation.Valid;
import java.util.Set;


@CrossOrigin(origins={ "http://localhost:3000" }, allowedHeaders = "*")
@RestController
public class DeviceController {
    @Autowired
    private DivisionRepository divisionRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping("/{id}/devices/")
    public ResponseEntity<?> getAllHomeDivisions(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Division division = this.divisionRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not find division with id" + id));
        Set <Device> devices = division.getDevices();

        System.out.println(devices);

        return ResponseEntity.ok().body(devices);
    }

    @PostMapping("/devices")
    public Device addDevice(@Valid @RequestBody Device device) {
        System.out.println("-----"+ device.getDivision());
        return deviceRepository.save(device);
    }
}
