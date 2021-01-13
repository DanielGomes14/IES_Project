package ies.proj.geanihouse.controller;


import ies.proj.geanihouse.exception.ErrorDetails;
import ies.proj.geanihouse.exception.ResourceNotFoundException;
import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.Invite;
import ies.proj.geanihouse.repository.ClientRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import ies.proj.geanihouse.repository.InviteRepository;
import ies.proj.geanihouse.service.PermissionService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*", allowedHeaders = "*")
public class InvitationsController {

    private static final Logger LOG = LogManager.getLogger(HomeController.class);
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private InviteRepository inviteRepository;

    @Autowired
    private PermissionService permissionService;

    private UserDetails authenticateduser;


    @GetMapping("/homes/{id}/invites")
    public ResponseEntity<?> getHomeInvites(@PathVariable(value="id") Long id) throws ErrorDetails, ResourceNotFoundException {
        Home home = homeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("House not found for this id :: " + id));
        List<Invite> invites = inviteRepository.findAllByHome_id(id);

        this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (! permissionService.checkClientHome(home, this.authenticateduser)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        return ResponseEntity.ok().body(invites);
    }
    //invite person
    @PostMapping("/homes/invites")
    public ResponseEntity<?> inviteUser(@Valid @RequestBody Invite invite) throws  ResourceNotFoundException{
        Home home = homeRepository.findById(invite.getHome().getId()).orElseThrow(
                () -> new ResourceNotFoundException("House not found for this id :: " + invite.getHome().getId()));
        this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (! permissionService.checkClientHome(home, this.authenticateduser)){
            // List<Invite> invites = inviteRepository.findAllByHome_id(homeID);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot do invitations to a House you do not belong.");
        }
        //the client to be Invited
        Client invite_client = clientRepository.findByEmail(invite.getInvclient().getEmail());
        if (invite_client == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No client has been selected to be invited!");
        }
        //get The client associated with the User doing the request
        Client inviter = permissionService.getClient(this.authenticateduser);

        if (inviter.getEmail().equals(invite_client.getEmail()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't invite yourself.");

        List<Invite> check_invites = inviteRepository.findAllByInvclient_id(invite_client.getId());
        if (check_invites.size() > 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already invited this user");
        }

        Invite new_inv = new Invite(inviter, home, invite_client);
        inviteRepository.save(new_inv);

        List<Invite> invites = inviteRepository.findAllByHome_id(home.getId());

        return ResponseEntity.ok().body(invites);
    }
    //delete  invitations sent
    @DeleteMapping("/homes/invites/{inv_id}")
    public ResponseEntity<?> deleteHomeSentInvites(@PathVariable(value = "inv_id") Long inviteID )
            throws ResourceNotFoundException {
        Invite invite = inviteRepository.findById(inviteID).orElseThrow(
                () -> new ResourceNotFoundException("Invite not found for this id " + inviteID));
        this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (! permissionService.checkClientHome(invite.getHome(), this.authenticateduser)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Cannot deleted Received invites for a house you do not have permission ");
        }
        inviteRepository.delete(invite);
        //Return remaining Received Invites
        List<Invite> invites = inviteRepository.findAllByHome_id(invite.getHome().getId());
        return ResponseEntity.ok().body(invites);
    }

    @GetMapping("/invites")
    public ResponseEntity<?> getMyInvites() throws ErrorDetails,ResourceNotFoundException{
        this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Client invited = permissionService.getClient(this.authenticateduser);

        List<Invite> invites = inviteRepository.findAllByInvclient_id(invited.getId());

        return ResponseEntity.ok().body(invites);

    }
    //accept invites
    @PostMapping("/invites")
    public ResponseEntity<?> acceptInvite(@Valid @RequestBody Invite invite) throws  ResourceNotFoundException{
        Home home = homeRepository.findById(invite.getHome().getId())
                .orElseThrow( () -> new ResourceNotFoundException("House not found for this id :: " + invite.getHome().getId()));

        Client invite_client = clientRepository.findById(invite.getInvclient().getId()).orElseThrow(
                () -> new ResourceNotFoundException("House not found for this id :: " + invite.getHome().getId()));

        this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Client accepter = permissionService.getClient(this.authenticateduser);
        if (accepter.getId() != invite_client.getId()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        // add client to the Home
        home.getClients().add(accepter);
        homeRepository.save(home);
        // delete the invite
        inviteRepository.delete(invite);
        List<Invite> invites = inviteRepository.findAllByInvclient_id(accepter.getId());
        return ResponseEntity.ok().body(invites);

    }

    //delete received invites
    @DeleteMapping("/invites/{inv_id}")
    public ResponseEntity<?> deleteInvites(@PathVariable(value = "inv_id") Long inviteID )
            throws ResourceNotFoundException {
        Invite invite = inviteRepository.findById(inviteID).orElseThrow(
                () -> new ResourceNotFoundException("Invite not found for this id :: " + inviteID));

        this.authenticateduser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Client request_client= permissionService.getClient(this.authenticateduser);
        if(request_client.getId() != invite.getInvclient().getId()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot delete a invite that was not to you");
        }

        inviteRepository.delete(invite);
        List<Invite> invites = inviteRepository.findAllByHome_id(invite.getHome().getId());
        return ResponseEntity.ok().body(invites);
    }

}
