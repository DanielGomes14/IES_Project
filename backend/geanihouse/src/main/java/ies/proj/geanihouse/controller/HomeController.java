package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import ies.proj.geanihouse.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class HomeController {
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/homes")
    public  List<Home> getAllUserHomes(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //ver melhor
        if(authentication.getName()!=null) {
            User user = userRepository.findByUsername(authentication.getName());
            System.out.println(user);
            Client c = user.getClient();
            System.out.println(c);
            List<Home> homes = homeRepository.findAll();
            System.out.println("-!->" + c.getHomes());
            for (Home home : homes) {
                System.out.println("-->" + home.getClients());
            }
            System.out.println(homeRepository.findAllByClients_id(c.getId()));
            return homeRepository.findAllByClients_id(c.getId());
        }
       return  null;

    }

}
