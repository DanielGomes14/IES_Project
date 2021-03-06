package ies.proj.geanihouse.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

import lombok.*;

@Entity
@Table(name="Home")
@Getter @Setter
public class Home{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin", referencedColumnName = "id")
    private Client admin;

    @Column(name = "name", nullable = false,length=100)
    private String name;

    @Column(name = "address", length=150)
    private String address;

    @Column(name = "city",length=60)
    private String city;

    @Column(name = "state",length=60)
    private String state;

    @Column(name = "zip_code",length=15)
    private String zipCode;

    @OneToMany(mappedBy="home",cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Division> divisions;


    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(name = "Client_Home",
            joinColumns = {
                    @JoinColumn(name = "home_id", referencedColumnName = "id",
                            nullable = false, updatable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "client_id", referencedColumnName = "id",
                            nullable = false, updatable = false)})
    @JsonIgnoreProperties("homes")
    private Set<Client> clients = new HashSet<Client>();

    public Home(){

    }
    public Home(long id,Client admin,String name,String address,String city,String state,String zipCode){
        this.id = id;
        this.admin = admin;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}