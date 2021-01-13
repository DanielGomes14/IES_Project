package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.DeviceLog;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.repository.DeviceLogRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import ies.proj.geanihouse.service.PermissionService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class DeviceLogController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private DeviceLogRepository deviceLogRepository;
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private PermissionService permissionService;

    @GetMapping("/{house_id}/sensorlog")
    public ResponseEntity<?> getHouseDeviceLog(@PathVariable(value = "house_id") long id) throws ResourceNotFoundException {
        Home h = homeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not found home with id" + id));
        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientHome(h, authenticateduser)){
            ResponseEntity.status(403).body("Cannot update a Device from a House you Dont Belong!");
        }
        List<DeviceLog> data = deviceLogRepository.findAllByDevice_Division_Home_Id(id);
        return ResponseEntity.ok().body(data);
    }

    @DeleteMapping("/sensorlog/{id}")
    public Map<String,Boolean> deleteDeviceLog(@PathVariable(value = "id") long deviceLogId)
            throws  ResourceNotFoundException{
        DeviceLog deviceLog = deviceLogRepository.findById(deviceLogId)
                .orElseThrow( () ->  new ResourceNotFoundException("Could not found DeviceLog with id" + deviceLogId));
        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String,Boolean> response = new HashMap<>();
        if(! permissionService.checkClientDivision(deviceLog.getDevice().getDivision(),authenticateduser)){
            // Forbidden!
            response.put("deleted",Boolean.FALSE);
            return response;
        }
        LOG.info("deleting deviceLog: "+ deviceLog);
        deviceLogRepository.delete(deviceLog);
        response.put("deleted",Boolean.TRUE);
        return  response;
    }

}
