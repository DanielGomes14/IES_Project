package ies.proj.geanihouse.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;

import lombok.*;

@Entity
@Table( name = "Sensor_Data")
@Setter @Getter
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name="sensor_id")
    private Sensor sensor;

    @CreationTimestamp
    @Column(name = "timestamp_date")
    private Timestamp timestampDate;

    @Column(name = "data")
    private double data;

    public SensorData(){

    }

    public SensorData(long id,Sensor sensor, Timestamp timestampDate, double data){
        this.id = id;
        this.sensor = sensor;
        this.timestampDate = timestampDate;
        this.data = data;
    }

    public SensorData(Sensor sensor, Timestamp timestampDate, double data){
        this.sensor = sensor;
        this.timestampDate = timestampDate;
        this.data = data;
    }

}
