package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "Device_Conf")
@Getter @Setter
public class DeviceConf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "time_begin")
    private Timestamp timeBegin;

    @Column(name = "time_end")
    private Timestamp timeEnd;

    @Column(name = "value")
    private double value;

    @ManyToOne()
    @JoinColumn(name="device_id", nullable = false)
    private Device device;


    public DeviceConf(){

    }

    public DeviceConf(long id, Device device, Timestamp timeBegin, Timestamp timeEnd, double value){
        this.id = id;
        this.device = device;
        this.timeBegin = timeBegin;
        this.timeEnd = timeEnd;
        this.value = value;
    }
}
