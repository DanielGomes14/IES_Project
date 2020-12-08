package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.ClientRepository;
import ies.proj.geanihouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/*
    Created by
    Daniel Gomes on
    6-12-2020
 */
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClientRepository clientRepository;


    @GetMapping("/users")
    public  List<User>  getAllUsers(){
        System.out.println(userRepository.findAll());
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) throws ErrorDetails {
        if (userRepository.findByUsername(user.getUsername()) !=null) throw new ErrorDetails("There is already an user registered with the username \"" + user.getUsername() + "\""  );
        Client client = user.getClient();
        if(clientRepository.findByEmail(client.getEmail()) != null)  throw new ErrorDetails("There is already an user registered with the email \"" + client.getEmail() + "\""  );

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String pass = user.getPassword();
        user.setPassword(encoder.encode(pass));
        clientRepository.save(client);
        return userRepository.save(user);
    }


}
