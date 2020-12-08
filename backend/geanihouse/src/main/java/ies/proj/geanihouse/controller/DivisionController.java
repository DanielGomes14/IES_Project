package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins={ "http://localhost:3000" }, allowedHeaders = "*")
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
