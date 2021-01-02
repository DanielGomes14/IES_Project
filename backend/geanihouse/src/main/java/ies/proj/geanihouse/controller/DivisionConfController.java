package ies.proj.geanihouse.controller;


import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.DivisionConf;
import ies.proj.geanihouse.model.Sensor;
import ies.proj.geanihouse.model.Type;
import ies.proj.geanihouse.repository.DivisionConfRepository;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.TypeRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DivisionConfController {
    private static final Logger LOG = LogManager.getLogger(DivisionConf.class);


    @Autowired
    private DivisionConfRepository divisionConfRepository;

    @Autowired
    private DivisionRepository divisionRepository;

    @Autowired
    private TypeRepository typeRepository;


    @GetMapping("/divisions/configurations")
    public List<DivisionConf> getAllDivisionConfs(){
        return  divisionConfRepository.findAll();
    }
    @GetMapping("/divisions/{id}/configurations")
    public ResponseEntity<?> getDivisionConfs(@PathVariable(value = "id") long id) throws ResourceNotFoundException {

        Division division = divisionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException ("Could not find division with id :: " + id));
        LOG.info("Returning division Configurations for division with id  " + id);
        List<DivisionConf> divisionConfs = divisionConfRepository.findAllByDivisionId(id);
        return  ResponseEntity.ok().body(divisionConfs);

    }

    @PostMapping("/divisions/configurations")
    public DivisionConf addDivisionConfs(@Valid @RequestBody DivisionConf divisionConf) throws  ResourceNotFoundException, ErrorDetails{

        //check if division exists
        Division division= divisionRepository.findById(divisionConf.getDivision().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Could not Find division with id :: "+ divisionConf.getDivision().getId()));

        //check if the type is valid

        Type type = typeRepository.findByName(divisionConf.getType().getName());
        if(type == null){
            LOG.error("Invalid Type!");
            throw new ResourceNotFoundException("Could not Find Type with name :: " + type.getName());
        }
        divisionConf.setType(type);


        //check the contraints to create a new Configuration
        String error_message = checkValuesContraints(divisionConf);

        if (error_message != null) throw new ErrorDetails(error_message);
        error_message = checkConfsTypes(divisionConf,division);
        if(error_message != null)throw new ErrorDetails(error_message);

        LOG.info("Success inserting new Configuration for division " + division.getId());
        return divisionConfRepository.save(divisionConf);
    }

    @DeleteMapping("/divisions/configurations/{id}")
    public Map<String,Boolean> deleteDivisionConf(@PathVariable(value ="id") long id) throws ResourceNotFoundException{
        DivisionConf divisionConf = divisionConfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find division configuration with id ::" + id));
        divisionConfRepository.delete(divisionConf);
        Map <String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
    }

    @PutMapping("/divisions/configurations/{id}")
    public ResponseEntity<?> updateDivisionConf(@PathVariable(value = "id") long id, @Valid @RequestBody DivisionConf dconf) throws ResourceNotFoundException, ErrorDetails{
        DivisionConf divisionConf = divisionConfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find division configuration with id ::" + id));
        
        // verify if the type exists
        Type type = typeRepository.findByName(divisionConf.getType().getName());
        if(type == null){
            LOG.error("Invalid Type!");
            throw new ResourceNotFoundException("Could not Find Type with name :: " + type.getName());
        }

        // validates values
        String error_message = checkValuesContraints(divisionConf);
        if (error_message != null) throw new ErrorDetails(error_message);
        
        // validates conf types
        error_message = checkConfsTypes(divisionConf,divisionConf.getDivision());
        if(error_message != null)throw new ErrorDetails(error_message);


        divisionConf.setMinValue(dconf.getMinValue());
        divisionConf.setMaxValue(dconf.getMaxValue());
        divisionConfRepository.save(divisionConf);

        return  ResponseEntity.ok().body(divisionConf);
    }

    private String checkValuesContraints(DivisionConf divisionConf){
        String error_message=null;
        String type = divisionConf.getType().getName();
        if (divisionConf.getMinValue() > divisionConf.getMaxValue()){
            error_message = "Invalid Values, minimum value cannot be less than the max value!";
            LOG.warn(error_message);
        }
        else if(divisionConf.getMaxValue() - divisionConf.getMinValue() <= 5){
            error_message = "Invalid Values, the difference between the max and min value must be greater than 1!";
            LOG.warn(error_message);
        }

        double minValue = divisionConf.getMinValue();
        double maxValue = divisionConf.getMaxValue();

        if (type.equals("Temperature")){
            minValue = 15;
            maxValue = 35;
        }else if (type.equals("Humidity")){
            minValue = 40;
            maxValue = 60;
        }else if (type.equals("Luminosity")){
            minValue = 20;
            maxValue = 80;
        }

        if ( minValue > divisionConf.getMinValue() || maxValue < divisionConf.getMaxValue())
            error_message = "Invalid Values, "+type+" values are between "+ minValue+ "-"+maxValue;


        return error_message;
    }

    private String checkConfsTypes(DivisionConf divisionConf,Division division){
        //verify if there's not a sensor of the type present on the configuration that we want to add
        String error_message = null;
        boolean valid = false;
        for(Sensor s : division.getSensors()){
            if (s.getType().getName().equals(divisionConf.getType().getName())) {
                valid = true;
                break;
            }
        }
        if(!valid){
            error_message="Cannot add a configuration of type " + divisionConf.getType().getName() + " without a sensor of this type";
            LOG.warn(error_message);
            return error_message;
        }
        for(DivisionConf conf : division.getDivisionConf()){
            if(conf.getType().getName().equals(divisionConf.getType().getName())){
                error_message = "Cannot have two configurations of same type in the division " + division.getId();
                LOG.warn(error_message);
                return error_message;
            }
        }
        return error_message;
    }
}

