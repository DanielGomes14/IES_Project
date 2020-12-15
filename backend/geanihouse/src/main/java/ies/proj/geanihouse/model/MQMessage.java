package ies.proj.geanihouse.model;


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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSensor_id() {
        return sensor_id;
    }

    public void setSensor_id(long sensor_id) {
        this.sensor_id = sensor_id;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}

