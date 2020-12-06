package ies.proj.geanihouse.model;


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

    /*
        Forgot One to Many for divisions
     */


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin", referencedColumnName = "id")
    private User admin;

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
    private Set<Division> divisions;


    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(name = "user_homes",
            joinColumns = {
                    @JoinColumn(name = "home_id", referencedColumnName = "id",
                            nullable = false, updatable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "user_id", referencedColumnName = "id",
                            nullable = false, updatable = false)})
    private Set<User> users = new HashSet<>();


    
    public Home(){

    }

    public Home(long id,User admin,String name,String address,String city,String state,String zipCode){
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

    public User getAdmin(){
        return this.admin;
    }

    public void setAdmin(User admin){
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


}