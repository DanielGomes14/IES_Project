package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/users")
    public  List<User>  getAllUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) throws ErrorDetails {
        if (userRepository.findByEmail(user.getEmail()) !=null) throw new ErrorDetails("There is already an user registered with the email \"" + user.getEmail() + "\""  );
        return userRepository.save(user);
    }

}
