package ies.proj.geanihouse.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


/*
    Created by Bruno Bastos
    on 5-12-2020
*/



@Entity
@Table(name="Division")
@JsonIgnoreProperties({"hibernateLazyInitializer", "devices"})
public class Division{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;

    @ManyToOne()
    @JoinColumn(name="home_id", referencedColumnName = "id")
    @JsonIgnore
    private Home home;

    @Column(name = "name", nullable = false,length=50)
    private String name ;

    @OneToMany(mappedBy="division")
    private Set<Sensor> sensors = new HashSet<>();

    @OneToMany(mappedBy="division")
    private Set<Device> devices = new HashSet<>();

    @OneToMany(mappedBy="division")
    private Set<DivisionConf> divisionConf = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(name = "Division_Permissions",
            joinColumns = {
                    @JoinColumn(name = "division_id", referencedColumnName = "id",
                            nullable = false, updatable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "user_id", referencedColumnName = "id",
                            nullable = false, updatable = false)})
    private Set<User> users = new HashSet<>();



    public Division(){

    }
    public Division(long id,String name,Home home){
        this.id = id;
        this.name = name;
        this.home = home;
    }
   
    public long getId() {
        return id;
    }

    public void setId(long id){
        this.id = id;
    }


    public void setHome(Home home){
        this.home = home;
    }

    public Home getHome(){
        return this.home;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public Set<Sensor> getSensors(){
        return this.sensors;
    }

    public Set<Device> getDevices(){
        return this.devices;
    }

    public Set<DivisionConf> getDivisionConf() {
        return divisionConf;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setSensors(Set<Sensor> sensors) {
        this.sensors = sensors;
    }

    public String toString(){
        return this.getName();
    }

}



