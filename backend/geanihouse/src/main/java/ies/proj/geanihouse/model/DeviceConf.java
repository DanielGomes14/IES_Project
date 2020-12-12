package ies.proj.geanihouse.model;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "Device_Conf")
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
    @JoinColumn(name="device_id", referencedColumnName = "id", insertable = false, updatable = false)
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Timestamp getTimeBegin() {
        return timeBegin;
    }

    public void setTimeBegin(Timestamp timeBegin) {
        this.timeBegin = timeBegin;
    }

    public Timestamp getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(Timestamp timeEnd) {
        this.timeEnd = timeEnd;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }


    public String toString(){
        return this.device.getName() + " : "+ this.timeBegin.toString() ;
    }
}
