package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.DivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins={ "http://localhost:3000" }, allowedHeaders = "*")
@RestController
public class DivisionController {
    @Autowired
    private DivisionRepository divisionRepository;

    @GetMapping("/divisions")
    public List<Division> getAllUserHomes(){
        return  divisionRepository.findAll();
    }

    @PostMapping("/divisions")
    public  Division addDivision(@Valid @RequestBody Division division){
       return  divisionRepository.save(division);
        
    }
}
