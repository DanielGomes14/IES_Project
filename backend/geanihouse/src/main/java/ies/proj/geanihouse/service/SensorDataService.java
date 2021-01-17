package ies.proj.geanihouse.service;


import ies.proj.geanihouse.model.SensorData;
import ies.proj.geanihouse.repository.SensorDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class SensorDataService {
    @Autowired
    private SensorDataRepository sensorDataRepository;

    public List<SensorData> filterData(long id, List<String> types, LocalDateTime start_date, LocalDateTime end_date){
        List<SensorData> sensorData_list;

        if(types != null && start_date != null){
            Date start =  java.sql.Timestamp.valueOf(start_date);
            Date end = null;

            if( end_date != null ){
                end = Timestamp.valueOf(end_date);
            }
            else {
                // In case @param end_date is not passed as argument, then the end date will be the current time
                LocalDateTime now = LocalDateTime.now();
                end = java.sql.Timestamp.valueOf(now);
            }
            sensorData_list =  sensorDataRepository.findAllBySensor_Division_IdAndTimestampDateIsBetweenAndSensor_Type_NameIn(
                    id,start,end,types
            );
        }
        else if( types != null && end_date != null ){
            Date end = Timestamp.valueOf(end_date);
            sensorData_list = sensorDataRepository.findAllBySensor_Division_IdAndTimestampDateIsLessThanEqualAndSensor_Type_NameIn(
                    id,end,types
            );
        }
        else if (types != null){
            sensorData_list = sensorDataRepository.findAllBySensor_Division_IdAndSensor_Type_NameIn(
                    id,types
            );
        }
        else if(start_date != null){
            Date end = null;
            if (end_date != null) {
                end = Timestamp.valueOf(end_date);
            }
            else{
                LocalDateTime now = LocalDateTime.now();
                end = java.sql.Timestamp.valueOf(now);
            }
            Date start =  java.sql.Timestamp.valueOf(start_date);
            sensorData_list = sensorDataRepository.findAllBySensor_Division_IdAndTimestampDateIsBetween(
                    id,start,end
            );
        }
        else if (end_date != null ) {
            Date end = Timestamp.valueOf(end_date);
            sensorData_list = sensorDataRepository.findAllBySensor_Division_IdAndTimestampDateIsLessThanEqual(
                    id,end
            );
        }
        // In order to not return a massive ammount of Data we only return data from Sensors of this division of today
        else {
            LocalDateTime now2 = LocalDateTime.now();
            Date end = Timestamp.valueOf(now2.with(LocalTime.MIN));
            sensorData_list = sensorDataRepository.findAllBySensor_Division_IdAndTimestampDateIsGreaterThan(
                    id,end
            );
        }
        return sensorData_list;
    }

}
