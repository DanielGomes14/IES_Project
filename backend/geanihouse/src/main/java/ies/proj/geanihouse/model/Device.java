package ies.proj.geanihouse.model;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "Device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false,length = 50)
    private String name;

    @Column(name = "state",nullable = false)
    private double state;

    @ManyToOne()
    @JoinColumn(name="type_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Type type;

    @ManyToOne()
    @JoinColumn(name="division_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Division division;

    @OneToMany(mappedBy="device")
    private Set<DeviceLog> deviceLogs;

    @OneToMany(mappedBy="device")
    private Set<DeviceConf> deviceConf;

    public Device(){

    }

    public Device(long id,String name,double state,Type type, Division division){
        this.id = id;
        this.name = name;
        this.state = state;
        this.type = type;
        this.division = division;
    }

    public long getId() {
        return id;
    }

    public Set<DeviceLog> getDeviceLogs() {
        return deviceLogs;
    }

    public Set<DeviceConf> getDeviceConf() {
        return deviceConf;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public Division getDivision() {
        return division;
    }

    public void setState(double state) {
        this.state = state;
    }

    public double getState() {
        return state;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Type getType() {
        return type;
    }

    public String toString(){
        return this.division.getName()+ " : "+ this.type.getName()+ " : "+this.state;
    }




}
