package ies.proj.geanihouse.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.*;


@Entity
@Table(name="Division")
@Getter @Setter
public class Division{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;

    @ManyToOne()
    @JoinColumn(name="home_id",nullable = false)
    private Home home;

    @Column(name = "name", nullable = false,length=50)
    private String name ;

    @OneToMany(mappedBy="division",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Sensor> sensors = new HashSet<>();

    @OneToMany(mappedBy="division",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Device> devices = new HashSet<>();

    @OneToMany(mappedBy="division",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
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

}


