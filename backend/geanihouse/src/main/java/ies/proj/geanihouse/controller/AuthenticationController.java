package ies.proj.geanihouse.controller;

import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;

// import javax.validation.Valid;
// import java.util.List;

@RestController
public class AuthenticationController {
    @Autowired
    private ClientRepository clientRepository;

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