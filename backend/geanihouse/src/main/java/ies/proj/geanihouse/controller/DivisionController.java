package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class DivisionController {
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private  UserRepository userRepository;
    @GetMapping("/{id}/divisions/")
    public List<Division> getAllHomeDivisions(@PathVariable(value = "id") Long id)  {
        List <Division> divisions = divisionRepository.findAllByHome_id(id);
        System.out.println(divisions);

        return  divisions;
    }

    @PostMapping("/divisions")
    public  Division addDivision(@Valid @RequestBody Division division){
       return  divisionRepository.save(division);
        
    }
}
