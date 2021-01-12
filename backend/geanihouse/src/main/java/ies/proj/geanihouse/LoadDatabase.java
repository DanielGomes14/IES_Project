package ies.proj.geanihouse;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import ies.proj.geanihouse.repository.*;
import ies.proj.geanihouse.model.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.HashSet;

@Configuration
class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(UserRepository users,ClientRepository clients, HomeRepository homes,
                       DivisionRepository divisions, TypeRepository types, DeviceRepository devices,
                       NotificationRepository notifications, SensorRepository sensors,
                       SensorDataRepository sensordata, DivisionConfRepository divisionconfs,
                       DeviceLogRepository devicelogs) {

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
            h2.getClients().addAll(Arrays.asList(c1));
            homes.save(h2);

            Type temperature = new Type(1,"Temperature");
            Type humidity = new Type(2,"Humidity");
            Type luminosity = new Type(3,"Luminosity");
            Type eletronic = new Type(4,"Eletronic");
            types.save(temperature);
            types.save(humidity);
            types.save(luminosity);
            types.save(eletronic);

            Division division1 = new Division(1,"sala",h1);
            Division division2 = new Division(2,"WC",h1);
            divisions.save(division1);
            divisions.save(division2);
            
            //Sensor sensor = new Sensor(1, division, temperature);
            //sensors.save(sensor);

            Device light_bulb = new Device(1, "Lampada", 0.0, eletronic, division1);
            Device coffe_machine = new Device(2, "Máquina de Café", 0.0, eletronic, division1);
            Device air_cond = new Device(3,"Ar Condicionado",0.0,temperature,division1);
            Device desumidificador = new Device(3,"Desumidificador",0.0,humidity,division2);

            devices.save(light_bulb);
            devices.save(coffe_machine);
            devices.save(air_cond);
            devices.save(desumidificador);

            //SensorData init_data = new SensorData(1, sensor, Timestamp.valueOf("2007-09-23 10:10:10.0"), 25.0);
            //sensordata.save(init_data);

            Notification fire_alarm = new Notification(1, "Temperature Alarm", "Sensor 1 detected temperature above 40°Celsius.", Timestamp.valueOf("2007-09-23 10:10:10.0"), h1);
            notifications.save(fire_alarm);
            fire_alarm = new Notification(2, "Temperature Alarm", "Sensor 1 detected temperature above 40°Celsius.", Timestamp.valueOf("2007-09-23 10:10:10.0"), h1);
            notifications.save(fire_alarm);
            fire_alarm = new Notification(3, "Temperature Alarm", "Sensor 1 detected temperature above 40°Celsius.", Timestamp.valueOf("2007-09-23 10:10:10.0"), h1);
            notifications.save(fire_alarm);
            fire_alarm = new Notification(4, "Temperature Alarm", "Sensor 1 detected temperature above 40°Celsius.", Timestamp.valueOf("2007-09-23 10:10:10.0"), h1);
            notifications.save(fire_alarm);
            fire_alarm = new Notification(5, "Temperature Alarm", "Sensor 1 detected temperature above 40°Celsius.", Timestamp.valueOf("2007-09-23 10:10:10.0"), h1);
            notifications.save(fire_alarm);
            fire_alarm = new Notification(6, "Temperature Alarm", "Sensor 1 detected temperature above 40°Celsius.", Timestamp.valueOf("2007-09-23 10:10:10.0"), h1);
            notifications.save(fire_alarm);
            fire_alarm = new Notification(7, "Temperature Alarm", "Sensor 1 detected temperature above 40°Celsius.", Timestamp.valueOf("2007-09-23 10:10:10.0"), h1);
            notifications.save(fire_alarm);


            DivisionConf dc = new DivisionConf(1,division1,temperature,25,35);
            divisionconfs.save(dc);

            DeviceLog log1 = new DeviceLog(1, light_bulb, Timestamp.valueOf("2020-09-23 10:10:10.0"), 0);
            DeviceLog log2 = new DeviceLog(2, light_bulb, Timestamp.valueOf("2020-09-23 11:10:10.0"), 1);
            DeviceLog log3 = new DeviceLog(3, air_cond, Timestamp.valueOf("2020-09-23 10:10:10.0"), 20);
            DeviceLog log4 = new DeviceLog(4, air_cond, Timestamp.valueOf("2020-09-23 11:10:10.0"), 0);
            DeviceLog log5 = new DeviceLog(5, coffe_machine, Timestamp.valueOf("2020-09-23 10:10:10.0"), 1);
            DeviceLog log6 = new DeviceLog(6, desumidificador, Timestamp.valueOf("2020-09-23 10:10:10.0"), 40);
            devicelogs.save(log1);
            devicelogs.save(log2);
            devicelogs.save(log3);
            devicelogs.save(log4);
            devicelogs.save(log5);
            devicelogs.save(log6);
        };
    }
}

