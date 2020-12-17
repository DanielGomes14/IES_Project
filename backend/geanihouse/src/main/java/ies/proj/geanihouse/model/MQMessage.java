package ies.proj.geanihouse.model;

import lombok.*;

@Getter @Setter
public class MQMessage {
    private long sensor_id;
    private String type;
    private double value;
    public  MQMessage(long sensor_id,String type, double value){
        this.sensor_id=sensor_id;
        this.type=type;
        this.value=value;
    }

    public  MQMessage(long sensor_id,String type){
        this.sensor_id=sensor_id;
        this.type=type;
    }
}

