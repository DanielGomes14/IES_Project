package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import ies.proj.geanihouse.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class DivisionController {
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private PermissionService permissionService;
    private UserDetails authenticateduser;

    @GetMapping("/{home_id}/divisions/")
    public ResponseEntity<?> getAllHomeDivisions(@PathVariable(value = "home_id") Long id) throws ResourceNotFoundException {
        Home h = this.homeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not Found home with id" + id));
        this.authenticateduser=(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!this.permissionService.checkClientHome(h,this.authenticateduser)){
            return ResponseEntity.status(403).body("Can only Access Divisions of your Houses!");
        };
        List <Division> divisions = divisionRepository.findAllByHome_id(id);
        return  ResponseEntity.ok().body(divisions);
    }

    @PostMapping("/divisions")
    public ResponseEntity<?> addDivision(@Valid @RequestBody Division division) throws ErrorDetails, ResourceNotFoundException {
        Map<String, String> response = new HashMap<>();
        Home home = homeRepository.findById(division.getHome().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot add  home with id" + division.getHome().getId()));
        if (division.getName().trim().length() == 0){
            throw  new ErrorDetails("Can't add  divisions without a name");
        }
        this.authenticateduser=(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //verify if client doesn't add a division to a House that he does not belong!
        if(!this.permissionService.checkClientHome(home,this.authenticateduser)){
            return ResponseEntity.status(403).body("Cannot Add division to a House you don't belong.");
        }

        divisionRepository.save(division);


        return ResponseEntity.ok().body("Successfully added new division. ");
    }

    @DeleteMapping("/divisions/{id}")
    public Map<String,Boolean> deleteDivision(@PathVariable(value = "id") Long divisionId)
        throws ResourceNotFoundException{
        Division division = divisionRepository.findById(divisionId)
                .orElseThrow( () -> new ResourceNotFoundException("Division not found for this id :: " + divisionId));
        this.authenticateduser= (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String,Boolean> response = new HashMap<>();
        if(! permissionService.checkClientDivision(division,this.authenticateduser)){
            // Forbidden!
            response.put("deleted",Boolean.FALSE);
        }
        divisionRepository.delete(division);
        response.put("deleted",Boolean.TRUE);
        return response;
    }


}
