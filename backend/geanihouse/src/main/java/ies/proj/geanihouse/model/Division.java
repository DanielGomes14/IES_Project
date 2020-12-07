package ies.proj.geanihouse.model;



import javax.persistence.*;
import java.util.Set;


/*
    Created by Bruno Bastos
    on 5-12-2020
*/



@Entity
@Table(name="Division")
public class Division{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name="home_id", referencedColumnName = "id", insertable = false, updatable = false)    
    private Home home;

    @Column(name = "name", nullable = false,length=50)
    private String name ;

    // maybe add this to this annotation (cascade = CascadeType.ALL, orphanRemoval = true)
    @OneToMany(mappedBy="division")
    private Set<Sensor> sensors;

    @OneToMany(mappedBy="division")
    private Set<Device> devices;

    @OneToMany(mappedBy="division")
    private Set<DivisionConf> divisionConf;

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

    public String toString(){
        return this.home.getName()+ " : "+this.name;
    }

}



