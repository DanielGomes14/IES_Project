package ies.proj.geanihouse.controller;

import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Device;
import ies.proj.geanihouse.model.DeviceConf;
import ies.proj.geanihouse.model.MQMessage;
import ies.proj.geanihouse.repository.DeviceConfRepository;
import ies.proj.geanihouse.repository.DeviceRepository;
import ies.proj.geanihouse.service.DeviceConfigurationService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DeviceConfController {

    private static final Logger LOG = LogManager.getLogger(DeviceConfController.class);

    @Autowired
    private DeviceConfRepository deviceConfRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DeviceConfigurationService deviceConfigurationService;

    @GetMapping("/deviceconfigurations")
    public List<DeviceConf> getAllDeviceConfigurations() {
        return deviceConfRepository.findAll();
    }

    @GetMapping("/devices/{id}/deviceconfigurations")
    public ResponseEntity<?> getDeviceConfigurations(@PathVariable(value = "id") Long id, @RequestParam(required = false,defaultValue = "false") Boolean latest) throws ResourceNotFoundException{
        Device device = deviceRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Could not Find Device with id :: " + id));
        LOG.info("Returning all configurations from specificDevice");
        System.out.println("aaaaa");
        List<DeviceConf> deviceConfList = deviceConfRepository.findAllByDevice_Id(device.getId());
        return  ResponseEntity.ok().body(deviceConfList);

    }

    @PostMapping("/deviceconfigurations")
    public ResponseEntity<?> addNewConfiguration(@Valid @RequestBody DeviceConf deviceConf) throws ResourceNotFoundException,ErrorDetails {
        Device device = deviceRepository.findById(deviceConf.getDevice().getId())
                .orElseThrow( () -> new ResourceNotFoundException("Could not find Device with id :: " + deviceConf.getDevice().getId() ));
        Timestamp begindate = deviceConf.getTimeBegin();
        Timestamp enddate = deviceConf.getTimeEnd();
        if (!checkDates(device.getId(),begindate,enddate)) throw  new ErrorDetails("Invalid Scheduled Hours!");
        LOG.info("Success inserting new COnfiguration for this Device");
        deviceConfRepository.save(deviceConf);
        MQMessage message = new MQMessage("START_CONF",
                            deviceConf.getDevice().getId(),
                            device.getType().getName(),
                            deviceConf.getValue());
        deviceConfigurationService.scheduling(message,begindate);
        message.setMethod("END_CONF");
        deviceConfigurationService.scheduling(message,enddate);

        return  ResponseEntity.ok().body("Success inserting new Configuration for this Device");
    }


    @DeleteMapping("/deviceconfigurations/{id}")
    public Map<String,Boolean> removeConfiguration(@PathVariable(value = "id") Long id) throws ResourceNotFoundException{
        DeviceConf deviceConf = deviceConfRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not Found Configuration with id :: " + id));
        Map<String,Boolean> response = new HashMap<>();
        LOG.info("Removing new Device Configuration");
        deviceConfRepository.delete(deviceConf);
        response.put("deleted",Boolean.TRUE);
        return response;
    }

    public  boolean checkDates(long deviceid, Timestamp begindate,Timestamp enddate){
        List<DeviceConf> deviceConfList = deviceConfRepository.findAllByDevice_Id(deviceid);

        for(DeviceConf deviceConf : deviceConfList){
            if( ( deviceConf.getTimeBegin().getTime() <= begindate.getTime()) && (begindate.getTime() <= deviceConf.getTimeEnd().getTime())){
                LOG.warn("Already a conf with this schedule! Invalid Start Date");
                return  false;
            }
            else if(( deviceConf.getTimeBegin().getTime() <= enddate.getTime() ) &&  (enddate.getTime() <= deviceConf.getTimeEnd().getTime())){
                LOG.warn("Already a conf with this schedule! Invalid End Date");
                return  false;
            }
        }
        return  true;
    }
}
