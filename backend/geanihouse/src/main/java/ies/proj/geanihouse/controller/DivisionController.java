package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Division;
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
    @GetMapping("/divisions/")
    public List<Division> getAllHomeDivisions(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName());

        return  divisionRepository.findAll();
    }

    @PostMapping("/divisions")
    public  Division addDivision(@Valid @RequestBody Division division){
       return  divisionRepository.save(division);
        
    }
}
