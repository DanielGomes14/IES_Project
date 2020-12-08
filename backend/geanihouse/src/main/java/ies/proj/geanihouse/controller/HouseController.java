package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import ies.proj.geanihouse.repository.UserRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class HouseController {
    @Autowired
    private HomeRepository homeRepository;


    @GetMapping("/homes")
    public  List<Home> getAllUserHomes(){
        return  homeRepository.findAll();
    }

}
