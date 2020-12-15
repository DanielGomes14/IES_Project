package ies.proj.geanihouse.controller;

import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import  ies.proj.geanihouse.repository.UserRepository;

import javax.validation.Valid;
import java.util.Base64;

// import javax.validation.Valid;
// import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000" }, allowedHeaders = "*")
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

        String base64Credentials = auth.substring("Basic".length()).trim();
        String[] decoded = new String(Base64.getDecoder().decode(base64Credentials)).split(":", 2);
        String email = decoded[0];
        String password = decoded[1];
        User user = userRepository.findByClientEmailAndPassword(email,password);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().body("Logout Successful!");
    }
}