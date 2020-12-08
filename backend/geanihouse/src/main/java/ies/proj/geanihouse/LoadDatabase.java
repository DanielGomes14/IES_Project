package ies.proj.geanihouse;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import ies.proj.geanihouse.repository.*;
import ies.proj.geanihouse.model.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
class LoadDatabase {



    @Bean
    CommandLineRunner initDatabase(UserRepository users, HomeRepository homes,
                       DivisionRepository divisions, TypeRepository types,
                       SensorRepository sensors) {

        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User user = new User(1,"chico",encoder.encode("randomquerty"),"Admin");
            users.save(user);
            /*
            users.save(new User(1,"Chico", "Silva", "ace@cs.go",null,"Alpha Male","randomquerty"));
            users.save(new User(2,"Leandro", "Silva", "bot@cs.go",null,"Female","pass"));
            homes.save(new Home(1,users.findById(1),"Casa do Chico","ali","ok","adeus","zip"));
            divisions.save(new Division(1,"sala",homes.findById(1)));
            divisions.save(new Division(2,"WC",homes.findById(1)));
            types.save(new Type(1,"Temperature"));
            sensors.save(new Sensor(1,divisions.findById(1),types.findById(1)));
            */
        };
    }
}

