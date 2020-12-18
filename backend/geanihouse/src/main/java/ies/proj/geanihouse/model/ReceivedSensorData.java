package ies.proj.geanihouse.model;

import java.sql.Timestamp;

import lombok.*;

@Getter @Setter
public class ReceivedSensorData {

    private long sensor_id;
    private String type;
    private Timestamp timestamp;
    private double value;


    public ReceivedSensorData(long sensor_id,double data,String type,Timestamp timestamp){
        this.sensor_id = sensor_id;
        this.value = data;
        this.type = type;
        this.timestamp = timestamp;
    }

}
