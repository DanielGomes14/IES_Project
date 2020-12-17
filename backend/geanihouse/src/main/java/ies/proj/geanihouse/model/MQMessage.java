package ies.proj.geanihouse.model;

import lombok.*;

@Getter @Setter
public class MQMessage {
    private long sensor_id;
    private String type;
    private double value;
    private String method;
    public  MQMessage(String method,long sensor_id,String type,double value){
        this.method=method;
        this.sensor_id=sensor_id;
        this.type=type;
        this.value=value;
    }

    public  MQMessage(long sensor_id,String type){
        this.sensor_id=sensor_id;
        this.type=type;
    }
}

