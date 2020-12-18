package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Type")
@Getter @Setter
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false,length=50)
    private String name;

    @OneToMany(mappedBy="type",cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Sensor> sensors;

    @OneToMany(mappedBy="type",cascade = CascadeType.ALL )
    @JsonIgnore
    private Set<Device> devices;

    @OneToMany(mappedBy="type",cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<DivisionConf> divisionConf;

    public Type(){

    }
    public Type(long id,String name){
        this.id = id;
        this.name = name;
    }
}
