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

    @GetMapping("/devices/configurations")
    public List<DeviceConf> getAllDeviceConfigurations() {
        return deviceConfRepository.findAll();
    }

    @GetMapping("/devices/{id}/configurations")
    public ResponseEntity<?> getDeviceConfigurations(@PathVariable(value = "id") Long id, @RequestParam(required = false,defaultValue = "false") Boolean latest) throws ResourceNotFoundException{
        Device device = deviceRepository.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Could not Find Device with id :: " + id));
        LOG.info("Returning all configurations from specificDevice");
        List<DeviceConf> deviceConfList = deviceConfRepository.findAllByDevice_Id(device.getId());
        return  ResponseEntity.ok().body(deviceConfList);

    }

    @PostMapping("/devices/configurations")
    public ResponseEntity<?> addNewConfiguration(@Valid @RequestBody DeviceConf deviceConf) throws ResourceNotFoundException,ErrorDetails {
        Device device = deviceRepository.findById(deviceConf.getDevice().getId())
                .orElseThrow( () -> new ResourceNotFoundException("Could not find Device with id :: " + deviceConf.getDevice().getId() ));
        Timestamp begindate = deviceConf.getTimeBegin();
        Timestamp enddate = deviceConf.getTimeEnd();
        if (!checkDates(deviceConf,begindate,enddate))  throw  new ErrorDetails("Invalid Scheduled Hours!");

        LOG.info("Success inserting new Configuration for this Device");
        deviceConf.setDevice(device);
        deviceConfRepository.save(deviceConf);
        if(!device.getType().getName().equals("Eletronic")){
            MQMessage message =new MQMessage("START_CONF",
                                device.getId(),
                                device.getType().getName(),
                                deviceConf.getValue());
            deviceConfigurationService.scheduling(deviceConf,message,begindate);
            message.setMethod("END_CONF");
            deviceConfigurationService.scheduling(deviceConf,message,enddate);
        }
        else {
            deviceConfigurationService.scheduling(deviceConf,null,begindate);
            deviceConfigurationService.scheduling(deviceConf,null,enddate);
        }

        return  ResponseEntity.ok().body("Success inserting new Configuration for this Device");
    }

    @PutMapping("/devices/configurations/{id}")
    public ResponseEntity<?> editConfiguration(@PathVariable(value = "id") Long id,@Valid @RequestBody DeviceConf deviceConf) throws ResourceNotFoundException,ErrorDetails {
        DeviceConf saveddeviceConf = deviceConfRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not Found Configuration with id :: " + id));
        Timestamp begindate = deviceConf.getTimeBegin();
        Timestamp enddate = deviceConf.getTimeEnd();
        saveddeviceConf.setTimeBegin(begindate);
        saveddeviceConf.setTimeEnd(enddate);
        saveddeviceConf.setValue(deviceConf.getValue());
        
        if (!checkDates(deviceConf,begindate,enddate))  throw  new ErrorDetails("Invalid Scheduled Hours!");
        final DeviceConf updatedConf = deviceConfRepository.save(saveddeviceConf);
        
        System.out.println(deviceConf.getDevice());
        System.out.println(deviceConf.getDevice().getType());

        if(!updatedConf.getDevice().getType().equals("Eletronic")){
            Device device =updatedConf.getDevice();
            MQMessage message =new MQMessage("START_CONF",
            device.getId(),
            device.getType().getName(),
            updatedConf.getValue());
            deviceConfigurationService.editSchedule(updatedConf,message,begindate);
            message.setMethod("END_CONF");
            deviceConfigurationService.editSchedule(updatedConf,message,enddate);
        }
        else {
            deviceConfigurationService.editSchedule(updatedConf,null,begindate);
            deviceConfigurationService.editSchedule(updatedConf,null,enddate);
        }
        return ResponseEntity.ok().body(updatedConf);
    }

    @DeleteMapping("/devices/configurations/{id}")
    public Map<String,Boolean> removeConfiguration(@PathVariable(value = "id") Long id) throws ResourceNotFoundException{
        DeviceConf deviceConf = deviceConfRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not Found Configuration with id :: " + id));
        Map<String,Boolean> response = new HashMap<>();
        LOG.info("Removing new Device Configuration");
        deviceConfRepository.delete(deviceConf);
        response.put("deleted",Boolean.TRUE);
        return response;
    }

    public  boolean checkDates(DeviceConf updDeviceConf, Timestamp begindate,Timestamp enddate){
        long deviceid = updDeviceConf.getDevice().getId();
        List<DeviceConf> deviceConfList = deviceConfRepository.findAllByDevice_Id(deviceid);

        for(DeviceConf deviceConf : deviceConfList){
            if (deviceConf.getId() == updDeviceConf.getId())
                continue;
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
