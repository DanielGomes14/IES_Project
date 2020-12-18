package ies.proj.geanihouse.model;

import java.sql.Timestamp;

import lombok.*;

@Getter @Setter
public class ReceivedSensingData {

    private String method;
    private long id;
    private String type;
    private Timestamp timestamp;
    private double value;


    public ReceivedSensingData(String method, long id, double data, String type, Timestamp timestamp){
        this.method=method;
        this.id = id;
        this.value = data;
        this.type = type;
        this.timestamp = timestamp;
    }

}
