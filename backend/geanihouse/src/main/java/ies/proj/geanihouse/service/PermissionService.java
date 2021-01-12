package ies.proj.geanihouse.service;

import ies.proj.geanihouse.model.Client;
import ies.proj.geanihouse.model.Division;
import ies.proj.geanihouse.model.Home;
import ies.proj.geanihouse.model.User;
import ies.proj.geanihouse.repository.ClientRepository;
import ies.proj.geanihouse.repository.HomeRepository;
import ies.proj.geanihouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/*
Service used to know if an AUTHENTICATED client,
can access a certain resource.
 */
@Service
public class PermissionService {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private UserRepository userRepository;

    public Client getClient(UserDetails userDetails){
        User user = userRepository.findByUsername(userDetails.getUsername());
        Client c = user.getClient();
        return c;
    }


    public boolean checkClientHome(Home home, UserDetails userDetails){
        Client req_client = this.getClient(userDetails);
        for(Client c : home.getClients()){
            if (c.getId() == req_client.getId()){
             return true;
            }
        }
        return  false;
    }

    public boolean checkClientDivision(Division division, UserDetails userDetails){
        Client req_client = this.getClient(userDetails);
        for(Client c : division.getHome().getClients()){
            if (c.getId() == req_client.getId()){
                return true;
            }
        }
        return  false;
    }

}
