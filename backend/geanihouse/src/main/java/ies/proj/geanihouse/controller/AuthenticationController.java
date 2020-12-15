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
    public ResponseEntity<Client> login(@RequestHeader("Authorization") String auth) {
        /*
        String base64Credentials = auth.substring("Basic".length()).trim();
        String email = new String(Base64.getDecoder().decode(base64Credentials)).split(":", 2)[0];
        Client client = clientRepository.findByPerson_Email(email);
        client.setLastLogin(new java.sql.Timestamp(Calendar.getInstance().getTime().getTime()));
        clientRepository.save(client);
        return ResponseEntity.ok().body(client);
        */
        return null;
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().body("Logout Successful!");
    }
}