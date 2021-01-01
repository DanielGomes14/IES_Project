package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.repository.DivisionRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/{id}/divisions/")
    public ResponseEntity<?> getAllHomeDivisions(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Home h = this.homeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not Found home with id" + id));
        List <Division> divisions = divisionRepository.findAllByHome_id(id);
        System.out.println(divisions);

        return  ResponseEntity.ok().body(divisions);
    }

    @PostMapping("/divisions")
    public Map<String,String> addDivision(@Valid @RequestBody Division division){
        Map<String, String> response = new HashMap<>();

        if (division.getName().trim().length() == 0){
            response.put("error", "Can't add divisions without a name");
            return response;
        }
        divisionRepository.save(division);
        response.put("success", "Successfully added new division.");
        return response;
    }

    @DeleteMapping("/divisions/{id}")
    public Map<String,Boolean> deleteDivision(@PathVariable(value = "id") Long divisionId)
        throws ResourceNotFoundException{
        Division division = divisionRepository.findById(divisionId)
                .orElseThrow( () -> new ResourceNotFoundException("Division not found for this id :: " + divisionId));
        divisionRepository.delete(division);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
    }


}
