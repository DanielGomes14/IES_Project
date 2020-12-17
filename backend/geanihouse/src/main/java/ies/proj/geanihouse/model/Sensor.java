package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

import lombok.*;

@Entity
@Table( name = "Sensor")
@Getter @Setter
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // There must be a @OneToMany on Division
    @ManyToOne()
    @JoinColumn(name="division_id",nullable = false)
    private Division division;


    // There must be a @OneToMany on Type
    @ManyToOne()
    @JoinColumn(name="type_id",nullable = false)
    private Type type;

    @OneToMany(mappedBy="sensor",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<SensorData> sensor_data;

    public Sensor(){

    }

    public Sensor(long id, Division division, Type type){
        this.id = id;
        this.division  = division;
        this.type = type;
    }
}
