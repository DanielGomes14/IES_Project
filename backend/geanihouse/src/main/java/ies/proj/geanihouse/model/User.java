package ies.proj.geanihouse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Date;
import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

//https://grokonez.com/spring-framework/spring-data/springjpa-save-filesimages-mysql-database-lob-annotation
//https://www.baeldung.com/spring-security-registration-password-encoding-bcrypt

/*
    Created by Bruno Bastos
    on 5-12-2020
*/

@Entity
@Table(name = "User")
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

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("admin")
    private Set<Home> homes = new HashSet<>();

    //OneToOne Client
    @OneToOne(mappedBy = "user")
    private Client client;


    public User(){

    }

    public User(long id, String username, String password,String role){
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getRoles() {
        return role;
    }

    public void setRoles(String role) {
        this.role = role;
    }

}
