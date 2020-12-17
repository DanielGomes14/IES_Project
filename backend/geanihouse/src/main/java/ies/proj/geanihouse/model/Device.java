package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "Device")
@Getter @Setter
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false,length = 50)
    private String name;

    @Column(name = "state",nullable = false)
    private double state;

    @ManyToOne()
    @JoinColumn(name="type_id",nullable = false)
    private Type type;

    @ManyToOne()
    @JoinColumn(name="division_id", referencedColumnName = "id",nullable=false)
    private Division division;

    @OneToMany(mappedBy="device",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<DeviceLog> deviceLogs;

    @OneToMany(mappedBy="device",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
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

}
