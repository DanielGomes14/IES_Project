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
                       DivisionRepository divisions, TypeRepository types, DeviceRepository devices,
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

            Type temperature = new Type(1,"Temperature");
            Type humidity = new Type(2,"Humidity");
            Type luminosity = new Type(3,"Luminosity");
            Type eletronic = new Type(4,"Eletronic");
            types.save(temperature);
            types.save(humidity);
            types.save(luminosity);
            types.save(eletronic);

            Division division = new Division(1,"sala",h1);
            divisions.save(division);
            divisions.save(new Division(2,"WC",h1));
            
            Sensor sensor = new Sensor(1, division, temperature);
            sensors.save(sensor);

            Device light_bulb = new Device(1, "Lampada", 0.0, eletronic, division);
            Device coffe_machine = new Device(2, "Máquina de Café", 0.0, eletronic, division);
            devices.save(light_bulb);
            devices.save(coffe_machine);

        };
    }
}

