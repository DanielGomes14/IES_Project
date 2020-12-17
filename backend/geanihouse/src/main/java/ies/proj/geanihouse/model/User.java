package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Date;
import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

import lombok.*;

@Entity
@Table(name = "User")
@Getter @Setter
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username",nullable = false)
    private String username;

    //@ToString.Exclude             needs lombok
    @Column(name = "password")
    private String password;

    @Column(name = "is_active",nullable = false)
    private boolean active = true;

    @Column(name = "role",nullable = false)
    private String role;                   //add new roles maybe (admin)



    //OneToOne Client
    @OneToOne(mappedBy = "user")
    private Client client;


    public User(){

    }

    public User( String username, String password,String role){
        this.username = username;
        this.password = password;
        this.role = role;
    }
    public User(long id, String username, String password,String role){
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }


}
