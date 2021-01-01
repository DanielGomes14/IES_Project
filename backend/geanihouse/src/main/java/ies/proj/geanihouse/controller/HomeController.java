package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.HomeRepository;
import org.apache.juli.logging.Log;

import java.util.HashMap;
import java.util.Map;
import java.util.function.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import ies.proj.geanihouse.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@RestController
public class HomeController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/homes")
    public ResponseEntity<?> getAllUserHomes() throws ErrorDetails,ResourceNotFoundException{
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

    @GetMapping("/homes/{id}")
    public ResponseEntity<?> getHomeById(@PathVariable(value="id") Long id) throws ErrorDetails,ResourceNotFoundException{
        System.out.println("------------------------------------------"+id);
        Home home = homeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("House not found for this id :: " + id));
        System.out.println(home);
        return ResponseEntity.ok().body(home);
    }


    @PostMapping("/newhouse")
    public  Home addnewHome(@Valid @RequestBody Home home) throws  ResourceNotFoundException{
            return homeRepository.save(home);
    }

    @DeleteMapping("/homes/{id}")
    public Map<String,Boolean> deleteHouse(@PathVariable(value = "id") Long homeId)
            throws ResourceNotFoundException {
            Home home = homeRepository.findById(homeId)
                    .orElseThrow( () -> new ResourceNotFoundException("House not found for this id :: " + homeId));
            LOG.debug("deleting house: "+ home);
            homeRepository.delete(home);
            Map<String,Boolean> response = new HashMap<>();
            response.put("deleted",Boolean.TRUE);
            return response;
    }

}
