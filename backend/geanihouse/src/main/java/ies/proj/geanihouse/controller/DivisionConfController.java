package ies.proj.geanihouse.controller;


import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.DivisionConf;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.Device;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.Type;
import ies.proj.geanihouse.repository.DivisionConfRepository;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.TypeRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import ies.proj.geanihouse.service.DivisionConfService;
import ies.proj.geanihouse.service.PermissionService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins={ "*" }, allowedHeaders = "*")
@RestController
public class DivisionConfController {
    private static final Logger LOG = LogManager.getLogger(DivisionConf.class);


    @Autowired
    private DivisionConfRepository divisionConfRepository;

    @Autowired
    private DivisionRepository divisionRepository;

    @Autowired
    private HomeRepository homeRepository;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private DivisionConfService divisionConfService;

    @GetMapping("/divisions/configurations")
    public List<DivisionConf> getAllDivisionConfs(){
        return  divisionConfRepository.findAll();
    }

    @GetMapping("/divisions/{division_id}/configurations")
    public ResponseEntity<?> getDivisionConfs(@PathVariable(value = "division_id") long id) throws ResourceNotFoundException {
        Division division = divisionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException ("Could not find division with id :: " + id));
        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(division, authenticateduser)){
            return  ResponseEntity.status(403).body("Cannot get Configurations of a Division you Dont Belong!");
        }
        LOG.info("Returning division Configurations for division with id  " + id);
        List<DivisionConf> divisionConfs = divisionConfRepository.findAllByDivisionId(id);
        return  ResponseEntity.ok().body(divisionConfs);
    }


    @PostMapping("/divisions/configurations/default")
    public ResponseEntity<?> addDefaultDivisionConfs(@Valid @RequestBody Division division) throws  ResourceNotFoundException, ErrorDetails{
        Division d = this.divisionRepository.findById(division.getId()).orElseThrow( () -> new ResourceNotFoundException("Could not Found division with id" + division.getId()));

        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!this.permissionService.checkClientDivision(d, authenticateduser)){
            return ResponseEntity.status(403).body("Can only Access Divisions Configurations of your Houses!");
        };
        divisionConfService.addDefaultConfigurations(d);
        LOG.info("Success adding default configurations for division " + d.getId());
        return ResponseEntity.ok().body("Success adding default configurations");
    }



    @PostMapping("/divisions/configurations")
    public ResponseEntity<?> addDivisionConfs(@Valid @RequestBody DivisionConf divisionConf) throws  ResourceNotFoundException, ErrorDetails{

        //check if division exists
        Division division= divisionRepository.findById(divisionConf.getDivision().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Could not Find division with id :: "+ divisionConf.getDivision().getId()));

        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(division, authenticateduser)){
            return  ResponseEntity.status(403).body("Cannot add Configurations of a Division you Dont Belong!");
        }

        Type type = typeRepository.findByName(divisionConf.getType().getName());
        if(type == null){
            LOG.error("Invalid Type!");
            throw new ResourceNotFoundException("Could not Find Type");
        }
        divisionConf.setType(type);

        //check the contraints to create a new Configuration
        String error_message = divisionConfService.checkValuesContraints(divisionConf);

        if (error_message != null) throw new ErrorDetails(error_message);
        error_message = divisionConfService.checkConfsTypes(divisionConf,division);
        if(error_message != null)throw new ErrorDetails(error_message);

        LOG.info("Success inserting new Configuration for division " + division.getId());
        divisionConfRepository.save(divisionConf);
        return ResponseEntity.ok().body("Success inserting new Configuration");
    }


    @PutMapping("/divisions/configurations/{id}")
    public ResponseEntity<?> updateDivisionConf(@PathVariable(value = "id") long id, @Valid @RequestBody DivisionConf dconf) throws ResourceNotFoundException, ErrorDetails{
        DivisionConf divisionConf = divisionConfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find division configuration with id ::" + id));


        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientDivision(divisionConf.getDivision(), authenticateduser)){
            return  ResponseEntity.status(403).body("Cannot update Configurations of a Division you Dont Belong!");
        }
        LOG.info("PUT Request DivisionConf");
        // verify if the type exists
        Type type = typeRepository.findByName(divisionConf.getType().getName());
        if(type == null){
            LOG.error("Invalid Type!");
            throw new ResourceNotFoundException("Could not Find Type");
        }

        // validates values
        String error_message = divisionConfService.checkValuesContraints(divisionConf);
        if (error_message != null) throw new ErrorDetails(error_message);
        
        divisionConf.setMinValue(dconf.getMinValue());
        divisionConf.setMaxValue(dconf.getMaxValue());
        divisionConfRepository.save(divisionConf);
        
        return  ResponseEntity.ok().body(divisionConf);
    }

    @DeleteMapping("/divisions/configurations/{id}")
    public Map<String,Boolean> deleteDivisionConf(@PathVariable(value ="id") long id) throws ResourceNotFoundException{
        DivisionConf divisionConf = divisionConfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find division configuration with id ::" + id));
        UserDetails authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map <String,Boolean> response = new HashMap<>();
        if(!this.permissionService.checkClientDivision(divisionConf.getDivision(), authenticateduser)){
            response.put("deleted",Boolean.FALSE);
            return  response;
        }
        divisionConfRepository.delete(divisionConf);
        response.put("deleted",Boolean.TRUE);
        return response;
    }
}

