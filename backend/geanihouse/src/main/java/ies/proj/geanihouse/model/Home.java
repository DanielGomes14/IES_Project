package ies.proj.geanihouse.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;


/*
    Created by Bruno Bastos
    on 5-12-2020
*/



@Entity
@Table(name="Home")
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

    @OneToMany(mappedBy="home")
    @JsonIgnoreProperties("home")
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
    private Set<Client> clients = new HashSet<>();

    public Set<Client> getClients(){
        return clients;
    }
    
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

    public long getId(){
        return this.id;
    }

    public void setId(long id){
        this.id = id;
    }

    public Client getAdmin(){
        return this.admin;
    }

    public void setAdmin(Client admin){
        this.admin = admin;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getAddress(){
        return this.address;        
    }

    public void setAddress(String address){
        this.address = address;
    }

    public String getCity(){
        return this.city;
    }

    public void setCity(String city){
        this.city = city;
    }
    
    public String getState(){
        return this.state;
    }
    
    public void setState(String state){
        this.state = state;
    }

    public String getZipCode(){
        return this.zipCode;
    }
    
    public void setZipCode(String zipCode){
        this.zipCode = zipCode;
    }

    public Set<Division> getDivisions(){
        return this.divisions;
    }


    @Override
    public String toString(){
        return this.name + " : " + this.admin;
    }
}