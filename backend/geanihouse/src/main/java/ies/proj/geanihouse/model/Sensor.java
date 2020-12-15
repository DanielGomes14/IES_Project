package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table( name = "Sensor")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // There must be a @OneToMany on Division
    @ManyToOne()
    @JoinColumn(name="division_id", referencedColumnName = "id")
    @JsonIgnore
    private Division division;


    // There must be a @OneToMany on Type
    @ManyToOne()
    @JoinColumn(name="type_id", referencedColumnName = "id")
    @JsonIgnore
    private Type type;

    @OneToMany(mappedBy="sensor")
    private Set<SensorData> sensor_data;

    public Sensor(){

    }

    public Sensor(long id, Division division, Type type){
        this.id = id;
        this.division  = division;
        this.type = type;
    }


    public long getId(){
        return this.id;
    }

    public void setId(long id){
        this.id = id;
    }

    public Division getDivision(){
        return this.division;
    }

    public void setDivision(Division division){
        this.division = division;
    }

    public Type getType(){
        return this.type;
    }
    public void setType(Type type){
        this.type = type;
    }

    public Set<SensorData> getSensor_data() {
        return sensor_data;
    }

    public String toString(){
        return this.division + ": "+ this.type;
    }



}
