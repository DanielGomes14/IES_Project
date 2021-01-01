package ies.proj.geanihouse.controller;

import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Device;
import ies.proj.geanihouse.model.DeviceConf;
import ies.proj.geanihouse.repository.DeviceConfRepository;
import ies.proj.geanihouse.repository.DeviceRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public class DeviceConfController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);

    @Autowired
    private DeviceConfRepository deviceConfRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping("/devices/{id}/configurations")
    public ResponseEntity<?> getAllDeviceConfigurations(@PathVariable(value = "id") Long id, @RequestParam(required = false,defaultValue = "false") Boolean latest) throws ResourceNotFoundException{
        Device device = deviceRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Could not Find Device with id :: " + id));
        if (latest!=null && latest){
            LOG.debug("Only returning the latest configuration");
            List<DeviceConf> deviceConfList = deviceConfRepository.findFirstByDevice_idOrderByIdDesc(device.getId());
            return  ResponseEntity.ok().body(deviceConfList);
        }
        else{
            List<DeviceConf> deviceConfList = deviceConfRepository.findAllByDevice_Id(device.getId());
            return  ResponseEntity.ok().body(deviceConfList);
        }
    }



}
