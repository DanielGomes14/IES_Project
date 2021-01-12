package ies.proj.geanihouse.controller;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Notification;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.repository.NotificationRepository;
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
public class NotificationController {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private HomeRepository homeRepository;

    @Autowired
    private PermissionService permissionService;

    private  UserDetails authenticateduser;
    @GetMapping("/{id}/notifications")
    public ResponseEntity<?> getAllHomeNotifications(@PathVariable(value = "id") Long id,
                        @RequestParam(required = false, defaultValue = "false") Boolean all) throws ResourceNotFoundException {
        Home h = this.homeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("Could not find home with id" + id));

        this.authenticateduser= (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(! permissionService.checkClientHome(h,this.authenticateduser)){
            // Forbidden!
           return  ResponseEntity.status(403).body("Cannot Access Notifications of Homes you don't belong");
        }
        List<Notification> notifications;

        if (all!=null && all) {
            notifications = notificationRepository.findAllByHome_idOrderByTimestampDateDesc(id);
        } else {
            notifications = notificationRepository.findTop5ByHome_idOrderByTimestampDateDesc(id);
        }

        return  ResponseEntity.ok().body(notifications);
    }
}
