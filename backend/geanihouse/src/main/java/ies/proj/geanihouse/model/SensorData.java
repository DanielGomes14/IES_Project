package ies.proj.geanihouse.model;


import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table( name = "Sensor_Data")
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name="sensor_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Sensor sensor;

    @CreationTimestamp
    @Column(name = "timestamp_date")
    private Timestamp timestampDate;

    @Column(name = "data")
    private double data;

    public SensorData(){

    }

    public SensorData(long id,Sensor sensor, Timestamp timestampDate){
        this.id = id;
        this.sensor = sensor;
        this.timestampDate = timestampDate;
    }

    public long getId(){
        return this.id;
    }

    public void setId(long id){
        this.id = id;
    }

    public Sensor getSensor(){
        return this.sensor;
    }

    public void setSensor(Sensor sensor){
        this.sensor = sensor;
    }

    public Timestamp getTimestampDate(){
        return this.timestampDate;
    }

    public void setTimestampDate(Timestamp timestampDate){
        this.timestampDate = timestampDate;
    }

    public double getData() {
        return data;
    }

    public String toString(){
        return this.sensor.getDivision().getName() + ", Type  " + this.sensor.getType().getName()
                + ", Time: " + this.timestampDate.toString();
    }

}
