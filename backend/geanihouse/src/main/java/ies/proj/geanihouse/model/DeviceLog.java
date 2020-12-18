package ies.proj.geanihouse.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

import lombok.*;

@Entity
@Table(name = "Device_Log")
@Getter @Setter
public class DeviceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name="device_id", nullable = false)
    private Device device;

    @CreationTimestamp
    @Column(name = "timestamp_date")
    private Timestamp timestampDate;

    @Column(name = "data")
    private double data;


    public DeviceLog(){

    }

    public DeviceLog(long id,Device device, Timestamp timestampDate, double data){
        this.id = id;
        this.device = device;
        this.timestampDate = timestampDate;
        this.data = data;
    }
    public DeviceLog(Device device, Timestamp timestampDate, double data){
        this.device = device;
        this.timestampDate = timestampDate;
        this.data = data;
    }

}
