package ies.proj.geanihouse.controller;

import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import  ies.proj.geanihouse.repository.UserRepository;

import javax.validation.Valid;

// import javax.validation.Valid;
// import java.util.List;

@RestController
public class AuthenticationController {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user) throws ErrorDetails{

        Client client = user.getClient();

        // Verifies if there is an user with that email or username
        if(userRepository.findByUsername(user.getUsername())!=null){
            throw new ErrorDetails("There is already an user registered with that username.");
        }
        if(clientRepository.findByEmail(user.getClient().getEmail())!=null){
            throw new ErrorDetails("There is already an user registered with that email.");
        }

        clientRepository.save(client);

        // Encrypts password to be stored in the database
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestHeader("Authorization") String auth) {

        //verificar como passar isto
        String email = "aisdjas";
        String password = "asdasd";
        User user = userRepository.findByClientEmailAndPassword(email,password);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().body("Logout Successful!");
    }
}