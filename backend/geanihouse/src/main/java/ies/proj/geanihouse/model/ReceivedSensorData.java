package ies.proj.geanihouse.model;

import java.sql.Timestamp;

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

    public long getSensor_id() {
        return sensor_id;
    }

    public void setSensor_id(long sensor_id) {
        this.sensor_id = sensor_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public String toString(){
        return "sensor: "+this.sensor_id + "\n" + "type: "+ this.type+"\n" +
                "data: "+this.value + "\n" + "timestamp: " + this.timestamp.toString();
    }
}
