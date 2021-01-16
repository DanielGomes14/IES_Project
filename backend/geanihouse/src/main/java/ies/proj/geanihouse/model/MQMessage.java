package ies.proj.geanihouse.model;

import lombok.*;

import java.sql.Timestamp;

@Getter @Setter
public class MQMessage{
    private long id;
    private String type;
    private double value;
    private String method;
    //used to send configurations for devices
    private Timestamp beginDate;
    private     Timestamp endDate;
    public MQMessage(String method, long id, String type, double value){
        this.method = method;
        this.id = id;
        this.type = type;
        this.value = value;
    }

    public MQMessage(long id, String type){
        this.id = id;
        this.type = type;
    }

    public MQMessage(MQMessage copy){
        this.method = copy.method;
        this.id = copy.id;
        this.type = copy.type;
        this.value = copy.value;
    }


}

