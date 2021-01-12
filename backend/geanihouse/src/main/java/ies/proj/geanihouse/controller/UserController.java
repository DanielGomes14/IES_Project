package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.ClientRepository;
import ies.proj.geanihouse.repository.UserRepository;
import ies.proj.geanihouse.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private PermissionService permissionService;

    @GetMapping("/users")
    public  List<User>  getAllUsers(){
        System.out.println(userRepository.findAll());
        return userRepository.findAll();
    }

    @GetMapping("/clients")
    public  List<Client>  getAllClients(){
        return clientRepository.findAll();
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserId(@PathVariable(value="username") String username ){
        long id = userRepository.findByUsername(username).getId();
        return  ResponseEntity.ok().body(id);
    }


    @DeleteMapping("/users/{id}")
    public  Map<String,Boolean> deleteUser(@PathVariable(value = "id") long userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new ResourceNotFoundException("User not found with id :: " + userId));
        userRepository.delete(user);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
    }

    @DeleteMapping("/clients/{id}")
    public  Map<String,Boolean> deleteClient(@PathVariable(value = "id") long clientId) throws ResourceNotFoundException {
        Client client = clientRepository.findById(clientId)
                .orElseThrow( () -> new ResourceNotFoundException("Client not found with id :: " + clientId));
        clientRepository.delete(client);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
    }

}
