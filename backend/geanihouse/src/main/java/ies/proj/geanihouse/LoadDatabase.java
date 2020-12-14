package ies.proj.geanihouse;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import ies.proj.geanihouse.repository.*;
import ies.proj.geanihouse.model.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;

@Configuration
class LoadDatabase {



    @Bean
    CommandLineRunner initDatabase(UserRepository users,ClientRepository clients, HomeRepository homes,
                       DivisionRepository divisions, TypeRepository types,
                       SensorRepository sensors) {

        return args -> {

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User user = new User(1,"chico",encoder.encode("randomquerty"),"Admin");
            users.save(user);
            User user2 = new User(2,"leand12", encoder.encode("randomquerty"),"Admin");

            Client c = new Client(1,"Chiquit","Silva","teste@gmail.com","Male",user);
            Client c1 = new Client(2,"Leandro","Silva","mongo@gmail.com","Male",user2);
            clients.save(c);
            clients.save(c1);
            Home h1 = new Home(1,clients.findByEmail("teste@gmail.com"),"Casa do Chico","ali","ok","adeus","zip");
            h1.getClients().addAll(Arrays.asList(c,c1));
            homes.save(h1);
            Home h2 = new Home(2,clients.findByEmail("mongo@gmail.com"),"Casa do Lionel","ali","ok","adeus","zip");
            homes.save(h2);
            Type type = new Type(1,"Temperature");
            types.save(type);
            Division division = new Division(1,"sala",homes.findById(1));
            divisions.save(division);
            divisions.save(new Division(2,"WC",homes.findById(1)));
            Sensor sensor = new Sensor(1,divisions.findById(1),types.findById(1));
            sensors.save(sensor);

        };
    }
}

