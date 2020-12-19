package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Notification;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.repository.NotificationRepository;
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
public class NotificationController {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private HomeRepository homeRepository;

    @GetMapping("/{id}/notifications/")
    public ResponseEntity<?> getAllHomeNotifications(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Home h = this.homeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not find home with id" + id));
        List<Notification> notifications = notificationRepository.findTop5ByHome_id(id);
        System.out.println(notifications);
        return  ResponseEntity.ok().body(notifications);
    }
}
