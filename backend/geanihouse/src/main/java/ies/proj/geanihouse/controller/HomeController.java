package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.HomeRepository;
import org.apache.juli.logging.Log;
import java.util.function.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import ies.proj.geanihouse.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class HomeController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private UserRepository userRepository;
    /*
    @GetMapping("/homes")
    public  List<Home> getAllUserHomes(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LOG.info(authentication.getName());
        //ver melhor
        LOG.info("GET Request to /homes ");
        if(!authentication.getName().equals("anonymousUser")) {
            LOG.debug("User is authenticated");
            User user = userRepository.findByUsername(authentication.getName());
            Client c = user.getClient();

            List<Home> homes = homeRepository.findAll();

            for (Home home : homes) {
                LOG.info("-->" + home.getClients());
            }
            System.out.println(homeRepository.findAllByClients_id(c.getId()));
            return homeRepository.findAllByClients_id(c.getId());
        }
        LOG.error("User not authenticated!");
       return  null;
    }
    */

    @GetMapping("/homes")
    public ResponseEntity<List<Home>> getAllUserHomes() throws ErrorDetails,ResourceNotFoundException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LOG.info(authentication.getName());
        //ver melhor
        LOG.info("GET Request to /homes ");
        if(!authentication.getName().equals("anonymousUser")) {
            LOG.debug("User is authenticated");
            User user = userRepository.findByUsername(authentication.getName());
            Client c = user.getClient();

            List<Home> homes = homeRepository.findAll();

            for (Home home : homes) {
                LOG.info("-->" + home.getClients());
            }
            System.out.println(homeRepository.findAllByClients_id(c.getId()));
            //MISSING OR ELSE THROW
            List <Home> userhomes = homeRepository.findAllByClients_id(c.getId());
            return ResponseEntity.ok().body(userhomes);
        }
        LOG.error("User not authenticated!");
        throw  new ErrorDetails("User not authenticated!");
    }

}
