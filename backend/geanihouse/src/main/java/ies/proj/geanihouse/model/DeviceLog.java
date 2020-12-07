package ies.proj.geanihouse.model;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "Device")
public class DeviceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name="device_id", referencedColumnName = "id", insertable = false, updatable = false)
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


    public long getId() {
        return id;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public Timestamp getTimestampDate() {
        return timestampDate;
    }

    public void setTimestampDate(Timestamp timestampDate) {
        this.timestampDate = timestampDate;
    }

    public double getData() {
        return data;
    }

    public void setData(double data) {
        this.data = data;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String toString(){
        return this.device.getName() + " : " + this.timestampDate.toString()+ " : " + this.data;
    }


}
