package ies.proj.geanihouse.model;



import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.TypeAlias;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Client")
@Getter @Setter
public class Client {


    //Change this to use the user
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name", nullable = false,length=50)
    private String firstName;

    @Column(name = "last_name", nullable = false,length=50)
    private String lastName;

    @Column(name = "email", nullable = false,length=320)
    private String email;

    @Column(name = "sex" ,length=10)
    private String sex;

    @Column(name = "birth")
    private java.sql.Date birth;

    @Lob
    @Column(name="profilepic")
    private byte[] profilepic;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    @ManyToMany(mappedBy = "clients", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Home> homes = new HashSet<>();

    public  Client(){

    }
    public Client(long id,String firstName, String lastName, String email, String sex, User user) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.sex=sex;
        this.user=user;
    }

}
