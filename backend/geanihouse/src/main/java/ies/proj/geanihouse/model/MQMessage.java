package ies.proj.geanihouse.model;

import lombok.*;

@Getter @Setter
public class MQMessage{
    private long id;
    private String type;
    private double value;
    private String method;

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

}

