package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.ClientRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import ies.proj.geanihouse.service.PermissionService;
import org.apache.juli.logging.Log;

import java.util.HashMap;
import java.util.Set;
import java.util.Map;
import java.util.function.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import ies.proj.geanihouse.repository.UserRepository;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class HomeController {
    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PermissionService permissionService;

    private UserDetails authenticateduser;

    @GetMapping("/homes")
    public ResponseEntity<?> getAllUserHomes() throws ErrorDetails,ResourceNotFoundException{
        this.authenticateduser =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        LOG.info("GET Request to /homes ");
        User user = userRepository.findByUsername(this.authenticateduser.getUsername());
        Client c = user.getClient();
        List <Home> userhomes = homeRepository.findAllByClients_id(c.getId());
        return ResponseEntity.ok().body(userhomes);
    }

    @GetMapping("/homes/{id}")
    public ResponseEntity<?> getHomeById(@PathVariable(value="id") Long id) throws ErrorDetails,ResourceNotFoundException{
        Home home = homeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("House not found for this id :: " + id));
       this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       if (!permissionService.checkClientHome(home,this.authenticateduser)){
           return ResponseEntity.status(403).body("Can only Access your Homes!");
       }

        return ResponseEntity.ok().body(home);
    }


    @PostMapping("/newhouse")
    public  ResponseEntity<?> addnewHome(@Valid @RequestBody Home home) throws  ResourceNotFoundException{
        LOG.info("Add new Home");
        Client client = clientRepository.findById(home.getAdmin().getId())
                    .orElseThrow( () -> new ResourceNotFoundException("No Client Found with that ID"));;
        home.setAdmin(client);
        home.getClients().add(client);
        homeRepository.save(home);
        return ResponseEntity.ok().body(home);
    }

    @DeleteMapping("/homes/{id}")
    public Map<String,Boolean> deleteHouse(@PathVariable(value = "id") Long homeId)
        throws ResourceNotFoundException {
        Home home = homeRepository.findById(homeId)
                .orElseThrow( () -> new ResourceNotFoundException("House not found for this id :: " + homeId));
        this.authenticateduser= (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String,Boolean> response = new HashMap<>();
        if(! permissionService.checkClientHome(home,this.authenticateduser)){
            // Forbidden!
            response.put("deleted",Boolean.FALSE);
            return response;
        }
        LOG.debug("deleting house: "+ home);
        homeRepository.delete(home);

        response.put("deleted",Boolean.TRUE);
        return response;
    }

}
